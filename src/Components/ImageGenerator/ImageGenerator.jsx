import React, { useRef, useState } from "react";
import './ImageGenerator.css';
import default_image from '../Assets/panel_1.jpeg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const query = async (data) => {
        try {
        const response = await fetch('/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        return blob;
    }catch (error) {
        console.error("Error in query:", error);
        return null;
      }
    };

    const generateImage = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const response = await query({ inputs: inputRef.current.value });

        if (response) {
            const image = new Blob([response], { type: 'image/jpeg' });
            const image_url = URL.createObjectURL(image);
            setImage_url(image_url);
          } else {
            console.error("Failed to generate image.");
          }
          setLoading(false);
        }

    return (
    <div className="ai-image-generator">
        <div className="header">AI image <span>generator</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"?default_image:image_url} alt=""></img></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see"/>
            <div className="generate-btn" onClick={() =>{generateImage()}}>Generate</div>
        </div>
    </div>
    )
};

export default ImageGenerator;