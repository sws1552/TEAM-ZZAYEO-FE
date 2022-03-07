import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import styled from "styled-components";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as addPlaceActions } from "../redux/modules/addPlace";
import Image from '../elements/Images';

const Upload = (props) => {

    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    const preview = useSelector((state) => state.image.preview);
    const fileInput = React.useRef();

    // const addImage = e => {
    //     const nowSelectImageList = e.target.files;
    //     console.log(nowSelectImageList)
    //     const nowImageURLList = [...myImage];

    //     for (let i = 0; i < nowSelectImageList.length; i += 1) {
    //         test.append('image', nowSelectImageList[i])
    //         const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]) //미리보기
    //         nowImageURLList.push(nowImageUrl)
    //     }
    //     setMyImage(nowImageURLList)
    //     console.log(test)
    //     console.log(nowSelectImageList)
    //     dispatch(imageActions.setPreview(nowSelectImageList));
    // }


    // 여러개 업로드
    const handleImageUpload = (e) => {
        const fileArr = e.target.files;
        const filesArr = Array.from(e.target.files);
        let fileURLs = [];

        let file;
        let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

        for (let i = 0; i < filesLength; i++) {
            file = fileArr[i];
            let reader = new FileReader();

            reader.onload = () => {
                fileURLs[i] = reader.result;
                dispatch(imageActions.setPreview(reader.result));
                dispatch(addPlaceActions.imageURL(filesArr))
            };
            reader.readAsDataURL(file);
        }

    };

    return (
        <React.Fragment>
            <div>
                <Container onClick={() => {
                    fileInput.current.click()
                }}>
                    <AddPhotoAlternateOutlinedIcon
                        style={{
                            color: "gray",
                            fontSize: "30px",
                            textAlign: "center",
                            marginRight: "auto",
                            marginLeft: "auto",
                            marginTop: "33px",
                            display: "block"
                        }}
                    />
                </Container>

                {preview.map((v, idx) => {
                    return (
                        <>
                            <Container>
                                <Image
                                    key={v}
                                    width="100%"
                                    src={preview[idx] ? preview[idx] : "http://via.placeholder.com/400x300"} />
                                <button onClick={() => {
                                    dispatch(imageActions.deletePreview(idx))
                                }}>삭제</button>
                            </Container>

                        </>
                    )
                })}
                <Input
                    id="file"
                    type="file"
                    multiple
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    disabled={uploading}
                    ref={fileInput}
                    onChange={handleImageUpload}
                />
            </div>
        </React.Fragment>
    );
};

const Input = styled.input`
position: absolute;
width: 0;
height: 0;
padding: 0;
overflow: hidden;
border: 0;
`

const Container = styled.div`
width: 100px;
height: 100px;
border: 1px solid gray;
border-radius: 8px ;
cursor: pointer;
margin-right: "15px";
`


export default Upload;