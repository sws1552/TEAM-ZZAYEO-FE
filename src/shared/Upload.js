import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import styled from "styled-components";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as addPlaceActions } from "../redux/modules/addPlace";
import { actionCreators as planActions } from "../redux/modules/plan";
import imageCompression from 'browser-image-compression';


const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const preview = useSelector((state) => state.image.preview);
  const pre_preview = useSelector((state) => state.image.pre_preview);
  const imageURL = useSelector((state) => state.image.imageURL);

  const fileInput = React.useRef();

  const { preImgUrl, placeId } = props;


  React.useEffect(() => {
    if (preImgUrl?.length !== 0 && typeof preImgUrl !== "undefined") {
      dispatch(imageActions.preSetPreview(preImgUrl));
    }
  }, [preImgUrl])

  const actionImgCompress = async (fileSrc) => {

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(fileSrc, options);
      const myFile = new File([compressedFile], 'image.jpeg', {
        type: compressedFile.type,
      })

      await dispatch(imageActions.imageURL(myFile));

    } catch (error) {
      console.log(error);
    }
  }
  // 여러개 업로드
  const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    const filesArr = Array.from(e.target.files);
    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 5 ? 5 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();

      reader.onload = () => {
        fileURLs[i] = reader.result;
        setTimeout(() => {
          dispatch(imageActions.setPreview(reader.result))
        }, 1000);

        // dispatch(imageActions.imageURL(filesArr[i]));
        actionImgCompress(filesArr[i])
      };
      reader.readAsDataURL(file);
    }

  };

  return (
    <React.Fragment>
      <Container>
        <SelectBox
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4C4.44772 4 4 4.44772 4 5V19C4 19.4288 4.2699 19.7946 4.64909 19.9367L15.2929 9.29289C15.6834 8.90237 16.3166 8.90237 16.7071 9.29289L20 12.5858V5C20 4.44771 19.5523 4 19 4H5ZM22 14.999V5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V15.001C22 15.0003 22 14.9997 22 14.999ZM20 15.4142L16 11.4142L7.41421 20H19C19.5523 20 20 19.5523 20 19V15.4142ZM8.5 8C8.22386 8 8 8.22386 8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8ZM6 8.5C6 7.11929 7.11929 6 8.5 6C9.88071 6 11 7.11929 11 8.5C11 9.88071 9.88071 11 8.5 11C7.11929 11 6 9.88071 6 8.5Z"
                fill="#8F8CF1"
              />
            </svg>
          </div>
          <div style={{fontSize:"14px", fontWeight:"400", color:"#757575"}}>
            {preview.length + pre_preview.length !== 0 ? `${preview.length + pre_preview.length}/5` : "0/5"}
          </div>
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
          {pre_preview &&
            pre_preview.map((v, idx) => {
              return (
                <ImageBox key={v}>
                  <Image
                    width="100%"
                    src={
                      pre_preview[idx]
                        ? pre_preview[idx]
                        : null
                    }
                  ></Image>

                  <Button
                    onClick={() => {
                      dispatch(imageActions.deletePrePreview(idx));
                      dispatch(planActions.deleteMyPostImageDB(placeId, idx));
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.42499 18.2739C7.52549 22.3744 14.1737 22.3744 18.2742 18.2739C22.3747 14.1734 22.3747 7.52513 18.2742 3.42462C14.1737 -0.675884 7.52549 -0.675884 3.42499 3.42462C-0.675517 7.52513 -0.675517 14.1734 3.42499 18.2739Z"
                        fill="#212121"
                      />
                      <path
                        d="M14.8477 7L6.84914 15"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.85156 7L14.8501 15"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </ImageBox>
              );
            })}
          {preview &&
            preview.map((v, idx) => {
              return (
                <ImageBox key={v}>
                  <Image
                    width="100%"
                    src={
                      preview[idx]
                        ? preview[idx]
                        : null
                    }
                  ></Image>

                  <Button
                    onClick={() => {
                      dispatch(imageActions.deleteImage(idx));

                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.42499 18.2739C7.52549 22.3744 14.1737 22.3744 18.2742 18.2739C22.3747 14.1734 22.3747 7.52513 18.2742 3.42462C14.1737 -0.675884 7.52549 -0.675884 3.42499 3.42462C-0.675517 7.52513 -0.675517 14.1734 3.42499 18.2739Z"
                        fill="#212121"
                      />
                      <path
                        d="M14.8477 7L6.84914 15"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.85156 7L14.8501 15"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </ImageBox>
              );
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
`;
const Input = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const SelectBox = styled.div`
  min-width: 72px;
  height: 72px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TotalBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const ImageBox = styled.div`
  min-width: 72px;
  min-height: 72px;
  margin-right: 15px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

`;
const Image = styled.div`
  padding-top: 100%;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
  position: absolute;
`;
const Button = styled.div`
  position: absolute;
  cursor: pointer;
  right: 0;
  margin: 3px;
  border-radius: 21px;
`;
export default Upload;
