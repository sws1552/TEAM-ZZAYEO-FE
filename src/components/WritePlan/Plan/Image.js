import React from 'react';

const Image = () => {
    const formData = new FormData();

    const [postfiles, setPostfiles] = React.useState({
        file: [],
        previewURL: "",
    });

    const uploadFile = (e) => {
        e.stopPropagation();
        let reader = new FileReader();
        let file = e.target.files[0];
        const filesInArr = Array.from(e.target.files);

        reader.onloadend = () => {
            setPostfiles({
                file: filesInArr,
                previewURL: reader.result,
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    let profile_preview = null;
    
    if (postfiles.file !== null) {
        profile_preview = postfiles.file[0]?.type.includes("image/") ? (
            <img src={postfiles.previewURL} />
        ) : (
            <video src={postfiles.previewURL} />
        );
    }

    postfiles?.file.map((eachfile) => {
        formData.append("path", eachfile);
    });

    return (
        <div>
            <input
                id="upload-file"
                type="file"
                accept="image/*, video/*"
                multiple
                onChange={uploadFile}
            ></input>
            <label htmlFor="upload-file">파일선택</label>

        </div>
    );
};

export default Image;