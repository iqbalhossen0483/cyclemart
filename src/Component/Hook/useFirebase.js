import { useContext } from "react"
import { AuthFirebase } from "../Firebase/FirebaseProvider"

const useFirebase = () => {
    return useContext(AuthFirebase)
}
export default useFirebase;