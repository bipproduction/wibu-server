import { Md10K, MdInfo } from "react-icons/md";
import toast from "react-simple-toasts";


export default function tos(message: string, type?: "error" | "warning" | "success") {
    toast(message, {
        position: "top-center",
        render: (message) => (
            <div style={{
                backgroundColor: type == "error" ? "red" : type == "warning" ? "orange" : "green",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                width: "300px",
                border: "4px solid white",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
            }}>
                <div style={{
                    display: "flex",
                    gap: "10px",
                    alignContent: "center",
                    alignItems: "center",
                }}>
                    <MdInfo size={36}/>
                    <div style={{fontSize: "42px", fontWeight: "bold"}}>{type ?? "success"}</div>
                </div>
                <div>{message}</div>
            </div>
        )
    })
}