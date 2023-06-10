import { Upload } from "@mui/icons-material";
import { CircularProgress, InputAdornment } from "@mui/material";
import { useState } from "react";
import { fileUploadService } from "../services/s3-service";
import CtrlFillLabelTxtField from "./CtrlFillLabelTxtField";
import { notify } from "./notify";



function Fileupload({ txtFieldProps, name, title, errMsg, onUpload }) {
    const [loading, setLoading] = useState(false);
  
    async function handleFileUpload(e) {
      const { name } = e.target
      setLoading(true)
      try {
        let fileKey = await fileUploadService(e.target.files[0]);
        onUpload({ fieldName: name, fileKey })
      } catch (error) {
        console.log(error)
        onUpload({ fieldName: name, fileKey: null })
        if (error === "apiError")
          notify("error", "Error in File Uploading...");
      }
      setLoading(false)
    }
  
  
    return (
      <CtrlFillLabelTxtField type={"file"} name={name} title={title} {...txtFieldProps} onChange={handleFileUpload} errMsg={errMsg} endAdornment=
        <InputAdornment position={"start"} >
          {loading ? <CircularProgress size={20} /> : <Upload color='primary' />}
        </InputAdornment>
      />
    )
  }
  
  export default Fileupload