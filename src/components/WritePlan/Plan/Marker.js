import React from "react";


const Maker = ({ text, Num }) => {
  
    return (
        <div>
            <svg width="46" height="51" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_957_1220)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2479 46.9026C25.9615 45.5804 41.7037 37.2881 41.7037 22.8519C41.7037 12.4403 33.2635 4 22.8519 4C12.4403 4 4 12.4403 4 22.8519C4 37.2881 19.7422 45.5804 22.4559 46.9026C22.7119 47.0273 22.9918 47.0273 23.2479 46.9026ZM22.8516 30.9314C27.3137 30.9314 30.931 27.3142 30.931 22.8521C30.931 18.39 27.3137 14.7727 22.8516 14.7727C18.3895 14.7727 14.7722 18.39 14.7722 22.8521C14.7722 27.3142 18.3895 30.9314 22.8516 30.9314Z" fill="white" />
                </g>
                <circle cx="23" cy="23" r="15" fill="#4E49E2" />
                <defs>
                    <filter id="filter0_d_957_1220" x="0" y="0" width="45.7041" height="50.9961" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_957_1220" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_957_1220" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}


export default Maker