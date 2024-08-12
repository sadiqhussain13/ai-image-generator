import React, { useRef, useState } from "react";
import './ImageGenerator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import default_image1 from '../Assets/panel_1.jpeg';
import default_image2 from '../Assets/panel_2.jpeg';
import default_image3 from '../Assets/panel_3.jpeg';
import huggingfaceLogo from '../Assets/huggingface_logo-noborder.png';
import 'font-awesome/css/font-awesome.min.css';

const models = [
    {
      name: 'Littletinies',
      url: 'https://api-inference.huggingface.co/models/alvdansen/littletinies',
    },
    {
      name: 'FLUX.1-schnell',
      url: 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
    },
    {
        name: 'Stable Diffusion v1.5',
        url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    },
    {
        name: 'Dreamlike Photoreal 2.0',
        url: 'https://api-inference.huggingface.co/models/dreamlike-art/dreamlike-photoreal-2.0',
    },
  ];

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState(models[0]);

    const query = async (data) => {
        try {
        const response = await fetch('/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: selectedModel.url, inputs: data }),
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

         // Manually create variations of the prompt
         const basePrompt = inputRef.current.value;
         const prompts = [
             basePrompt,
             `${basePrompt} in a surreal style`,
             `${basePrompt} with high contrast`
         ];

        const responses = await Promise.all(prompts.map((prompt) => query({ inputs: prompt })));

            if (responses.every((response) => response !== null)) {
                const images = responses.map((response) => {
                const blob = new Blob([response], { type: 'image/jpeg' });
                const image_url = URL.createObjectURL(blob);
                return image_url;
                });

        setImage_url(images);
        } else {
        console.error("Failed to generate images.");
        }

        setLoading(false);
    };

    const downloadImage = (image_url) => {
        const link = document.createElement('a');
        link.href = image_url;
        link.download = 'image.jpg';
        link.click();
      };

    return (
    <div className="ai-image-generator">
        <div className="header">AI image <span>generator</span></div>
        <div className="model-select">
        <label className="model-label">Model:</label>
          <select value={selectedModel.name} onChange={(e) => setSelectedModel(models.find(model => model.name === e.target.value))}>
            {models.map((model) => (
              <option key={model.url} value={model.name}>{model.name}</option>
            ))}
          </select>
        </div>
        <div className="img-loading">
        <div className="image">
          {Array.isArray(image_url) ? (
            image_url.map((image_url, index) => (
                <div key={index} className="image-container">
                    <img src={image_url} alt="" />
                    <FontAwesomeIcon icon={faDownload} onClick={() => downloadImage(image_url)} />
                </div>
            ))
          ) : (
            <>
            <img src={default_image1} alt="Default" />
            <img src={default_image2} alt="Default" />
            <img src={default_image3} alt="Default" />
            </>
          )}
        </div>
            <div className="loading-container">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see"/>
            <div className="generate-btn" onClick={() =>{generateImage()}}>Generate</div>
        </div>
        <div className="footer">Powered by <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer"><img src={huggingfaceLogo} alt="Hugging Face"/>Hugging Face</a></div>
    </div>
    )
};

export default ImageGenerator;