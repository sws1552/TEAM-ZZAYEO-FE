import React from 'react';
import styled from 'styled-components';
import Upload from '../../../shared/Upload';
import Image from '../../../elements/Images';
const Detailplan = () => {
    return (
        <div>
            <div>1</div>
            <div>오전 08시 00분</div>
            <div>제주국제공항</div>
            <div>제주특별자치도 제주시 용담동</div>
            <Upload/>
            <Image  
            shape="rectangle" 
            width="100%"
            marginLeft="auto"
            src="http://via.placeholder.com/400x300"/>  

            <div style={{width:"100%" ,border:"2px solid gray", height:"150px"}}>메모상자</div>

        </div>
    );
};

export default Detailplan;

