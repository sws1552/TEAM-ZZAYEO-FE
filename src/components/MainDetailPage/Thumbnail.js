import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../../redux/modules/image";

const Thumbnail = (props) => {
  const dispatch = useDispatch();
  const {
    shareShowModal,
    keepModal,
    shareCloseModal,
    imageSrc,
    setImageSrc,
    closeModal,
  } = props;

  const fileInput = React.useRef();

  const onLoadFile = (fileBlob) => {
    dispatch(imageActions.thumbnailURL(fileBlob));
    let reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  if (shareShowModal) {
    return (
      <React.Fragment>
        <OpenModal>
          <Overlay onClick={keepModal}>
            <Modal>
              <Taps>
                <Ul>여행공개</Ul>
                <CloseBtn onClick={closeModal}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                      fill="black"
                      fillOpacity="0.87"
                    />
                  </svg>
                </CloseBtn>
              </Taps>
              <Container>
                <Info>여행을 대표할 멋진 커버사진을 올려주세요.</Info>
                {!imageSrc ? (
                  <AddImg
                    onClick={() => {
                      fileInput.current.click();
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 16V22"
                        stroke="#8F8CF1"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 19H22"
                        stroke="#8F8CF1"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <mask
                        id="mask0_1207_3266"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5 4C4.44772 4 4 4.44772 4 5V19C4 19.4288 4.2699 19.7946 4.64909 19.9367L15.2929 9.29289C15.6834 8.90237 16.3166 8.90237 16.7071 9.29289L20 12.5858V5C20 4.44771 19.5523 4 19 4H5ZM22 14.999V5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V15.001C22 15.0003 22 14.9997 22 14.999ZM20 15.4142L16 11.4142L7.41421 20H19C19.5523 20 20 19.5523 20 19V15.4142ZM8.5 8C8.22386 8 8 8.22386 8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8ZM6 8.5C6 7.11929 7.11929 6 8.5 6C9.88071 6 11 7.11929 11 8.5C11 9.88071 9.88071 11 8.5 11C7.11929 11 6 9.88071 6 8.5Z"
                          fill="#8F8CF1"
                        />
                      </mask>
                      <g mask="url(#mask0_1207_3266)">
                        <rect
                          x="1"
                          y="13"
                          width="13"
                          height="12"
                          fill="#8F8CF1"
                        />
                        <rect
                          x="2"
                          y="1"
                          width="21"
                          height="13"
                          rx="1"
                          fill="#8F8CF1"
                        />
                      </g>
                    </svg>
                  </AddImg>
                ) : (
                  ""
                )}
                <input
                  type="file"
                  onChange={(e) => {
                    onLoadFile(e.target.files[0]);
                  }}
                  ref={fileInput}
                  style={{ display: "none" }}
                />
                <div>
                  {imageSrc && <Img src={imageSrc} alt="preview"></Img>}
                </div>
              </Container>
              <Div>
                <Button onClick={shareCloseModal}>
                  <p>확인</p>
                </Button>
              </Div>
            </Modal>
          </Overlay>
        </OpenModal>
      </React.Fragment>
    );
  }
  return null;
};

const ModalBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  /* right: 0; */
  bottom: 0;
  /* left: 0; */
  background: rgba(0, 0, 0, 0.72);
  z-index: 9999;
  max-width: 420px;
  width: 100%;
  margin: auto;
  @media (max-width: 540px) {
    margin: auto;
    left: 0;
    right: 0;
}
`;

const OpenModal = styled(ModalBox)`
  display: flex;
  justify-content: center;
  
  @media (min-width: 1580px) {
  justify-content: flex-end;
  left: 1150px;
  }
  @media (max-width: 1579px) and (min-width: 541px) {
  right: 100px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  height: 368px;
  background-color: #ffffff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Taps = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 30px 0px 24px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Ul = styled.div``;

const CloseBtn = styled.div`
  padding-top: 5px;
  cursor: pointer;
`;

const Div = styled.div`
  padding: 0px 24px;
  font-family: "Roboto", sans-serif;
`;

const Button = styled.div`
  height: 48px;
  margin-top: 20px;
  margin-bottom: 37px;
  background-color: #bdbdbd;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
    color: #ffffff;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
  }

  :hover {
    background-color: #4e49e2;
    color: #ffffff;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 0px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Info = styled.div`
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  margin: 0px 0px 24px 0px;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
`;

const AddImg = styled.div`
  width: 100%;
  height: 160px;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  width: 100%;
  height: 160px;
  box-sizing: border-box;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: 8px;
`;

export default Thumbnail;
