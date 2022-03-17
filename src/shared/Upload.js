import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import styled from "styled-components";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as addPlaceActions } from "../redux/modules/addPlace";

const Upload = (props) => {

    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    const preview = useSelector((state) => state.image.preview);
    const imageURL = useSelector((state) => state.image.imageURL);

    const fileInput = React.useRef();

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
                dispatch(imageActions.imageURL(filesArr))
            };
            reader.readAsDataURL(file);
        }

    };

    return (
        <React.Fragment>
            <Container>
                <SelectBox onClick={() => {
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
                </SelectBox>

                <Input
                    id="file"
                    type="file"
                    multiple
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    disabled={uploading}
                    ref={fileInput}
                    onChange={handleImageUpload}
                />

                <TotalBox>
                    {preview && preview.map((v, idx) => {
                        return (
                            <ImageBox>
                                <Image
                                    key={v}
                                    width="100%"
                                    src={preview[idx] ? preview[idx] : "http://via.placeholder.com/400x300"}>
                                </Image>


                                <Button onClick={() => {
                                    dispatch(imageActions.deleteImage(idx))
                                }}>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.625 5.60875L15.3913 4.375L10.5 9.26625L5.60875 4.375L4.375 5.60875L9.26625 10.5L4.375 15.3913L5.60875 16.625L10.5 11.7337L15.3913 16.625L16.625 15.3913L11.7337 10.5L16.625 5.60875Z" fill="white" fill-opacity="0.87" />
                                    </svg>
                                </Button>
                            </ImageBox>
                        )
                    })}
                </TotalBox>


            </Container>
        </React.Fragment>
    );
};
const Container = styled.div`
display: flex;
overflow-x: scroll;
  &::-webkit-scrollbar {
        display: none;
    }
`
const Input = styled.input`
width: 0;
height: 0;
padding: 0;
overflow: hidden;
border: 0;
`
const SelectBox = styled.div`
min-width: 100px;
height: 100px;
border: 1px solid gray;
border-radius: 8px ;
cursor: pointer;
margin-right: 15px;
display: flex;
`

const TotalBox = styled.div`
display: flex;
width: 100%;
flex-direction: row;
`
const ImageBox = styled.div`
width: 100px;
min-height: 100px;
border: 1px solid gray;
margin-right: 15px;
border-radius: 8px ;
cursor: pointer;
position: relative;
:hover{
    box-shadow: 5px 5px 20px #ddd;
}

`
const Image = styled.div`
padding-top: 100%;
background-image: url("${(props) => props.src}");
background-size: cover;
display: block;
border-radius: 8px;
width: 100%;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
position: absolute;

`
const Button = styled.div`
position: absolute;
cursor: pointer;
right: 0;
margin: 3px;
border-radius: 21px;
`
export default Upload;