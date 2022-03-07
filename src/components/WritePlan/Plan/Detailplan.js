import React from 'react';
import styled from 'styled-components';
import Upload from '../../../shared/Upload';
import Image from '../../../elements/Images';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../../../redux/modules/image";




const Detailplan = () => {
    const dispatch = useDispatch()
    const preview = useSelector((state) => state.image.preview);

    return (
        <div>
            <div>1</div>
            <div>오전 08시 00분</div>
            <div>제주국제공항</div>
            <div>제주특별자치도 제주시 용담동</div>
           
            <Upload />
                {preview.map((v, idx) => {
                    return (
                        <>
                            <Image
                                key={idx}
                                width="40%"
                                src={preview[idx] ? preview[idx] : "http://via.placeholder.com/400x300"} />
                            <button onClick={() => {
                                dispatch(imageActions.deletePreview(idx))
                            }}>삭제</button>
                        </>
                    )
                })}
            <input style={{ width: "100%", border: "2px solid gray", height: "150px" }}></input>

        </div>
    );
};


export default Detailplan;

