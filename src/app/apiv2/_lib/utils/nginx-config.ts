interface SubdomainConfig {
  name: string;
  ports: number[];
}

interface DomainConfig {
  domain_name: string;
  sub_domains: SubdomainConfig[];
}

function nginxStringToJson(nginxConfig: string): DomainConfig {
  const subDomains: SubdomainConfig[] = [];
  const subdomainMap: Record<string, string> = {};
  let domainName = "";

  const mapRegex = /map\s+\$subdomain\s+\$([\w-]+)\s+\{([\s\S]+?)\}/;
  const mapMatch = nginxConfig.match(mapRegex);
  
  if (mapMatch) {
    domainName = mapMatch[1];
    const mapContent = mapMatch[2].trim();
    const mappingLines = mapContent.split('\n');
    
    mappingLines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const parts = trimmedLine.split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
          const subdomain = parts[0];
          const backendName = parts[1].replace(';', '');
          subdomainMap[subdomain] = backendName;
        }
      }
    });
  } else {
    throw new Error("Map block not found in Nginx config");
  }

  const upstreamRegex = /upstream\s+([^\s]+)\s+\{([\s\S]+?)\}/g;
  const upstreams: Record<string, number[]> = {};
  
  let upstreamMatch: RegExpExecArray | null;
  while ((upstreamMatch = upstreamRegex.exec(nginxConfig)) !== null) {
    const upstreamName = upstreamMatch[1];
    const upstreamContent = upstreamMatch[2];

    const ports: number[] = [];
    const serverRegex = /server\s+localhost:(\d+);/g;
    let serverMatch: RegExpExecArray | null;

    while ((serverMatch = serverRegex.exec(upstreamContent)) !== null) {
      ports.push(parseInt(serverMatch[1], 10));
    }

    upstreams[upstreamName] = ports;
  }

  for (const [subdomain, backendName] of Object.entries(subdomainMap)) {
    subDomains.push({
      name: subdomain,
      ports: upstreams[backendName] || []
    });
  }

  return {
    domain_name: domainName,
    sub_domains: subDomains
  };
}

function nginxJsonToString(domainConfig: DomainConfig): string {
  const { domain_name, sub_domains } = domainConfig;

  let config = `map $subdomain $${domain_name} {\n`;
  sub_domains.forEach(({ name }) => {
    config += `    ${name.padEnd(20)} ${name}_backend;\n`;
  });
  config += '}\n\n';

  sub_domains.forEach(({ name, ports }) => {
    config += `upstream ${name}_backend {\n`;
    config += '    least_conn;\n';
    config += '    keepalive       32;\n';
    config += '    keepalive_requests 200;\n';
    config += '    keepalive_timeout 120;\n';
    ports.forEach(port => {
      config += `    server localhost:${port};\n`;
    });
    config += '}\n\n';
  });

  return config.trim();
}

export { nginxStringToJson, nginxJsonToString };
export type { SubdomainConfig, DomainConfig };
