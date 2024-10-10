import { gql, useQuery, useMutation  } from '@apollo/client';
const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(audioFile: $file, duration: 10)
    }
` 

function UploadFile() {
    const [uploadFile] = useMutation(UPLOAD_FILE);
    return <>
    UploadFile <br />
    <input
      type="file"
      required
      onChange={({
        target: {
          validity,
          files: [file],
        },
      }) => {
        const newFile = new File([file],"ﾃｭﾃｬｵ9/10.mp3",  { type: file.type }) 
        if (validity.valid)
        //     file.name = "dustin.mp3"
        // console.log(file.name);
        
            uploadFile({
            variables: {
              file: newFile,
            },
          });
      }}
    />
    </>
}

export default UploadFile;
