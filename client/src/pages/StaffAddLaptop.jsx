import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addLaptop } from "../api/laptop.jsx";
import StaffHeader from "../components/StaffHeader.jsx";
import Footer from '../components/Footer.jsx';
import '../styles/StaffAddLaptop.css';

export default function StaffAddLaptop()
{
    const navigate = useNavigate();
    const [imgPreview, setImgPreview] = useState(null);
    const [formData, setFormData] = useState
    ({
        brand: '',
        model: '',
        image: null,
        ram: '',
        cpu: '',
        storage: '',
        price: 0
    });

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImage = (e) =>
    {
        const selectedImage = e.target.files[0];

        if(selectedImage)
        {
            setFormData((prev) => ({...prev, image: selectedImage}));
            setImgPreview(URL.createObjectURL(selectedImage));
        }
    };

    const handleReset = () =>
    {
        setFormData
        ({
            brand: '',
            model: '',
            image: null,
            ram: '',
            cpu: '',
            storage: '',
            price: 0
        });
        URL.revokeObjectURL(imgPreview);
        setImgPreview(null);
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();

        if(window.confirm('Proceed with adding laptop?'))
        {
            const response = await addLaptop(formData);

            if(response.ok)
            {
                URL.revokeObjectURL(imgPreview);
                navigate('/staff/browse');
            }   
        }
    };

    return (
        <>
            <title> Add Laptop - Wildcats CLAW </title>
            <StaffHeader/>
            <main className="addlaptop-container">
                <form onSubmit={handleSubmit}>
                    <h1> Add New Laptop </h1>
                    <p> Please enter details </p>
                    <hr/>
                    {/* Brand */}
                    <div className="laptop-input">
                        <label htmlFor="brand"> Brand </label>
                        <input 
                            id="brand" 
                            name="brand" 
                            type="text" 
                            value={formData.brand} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {/* Brand */}
                    <div className="laptop-input">
                        <label htmlFor="model"> Model </label>
                        <input 
                            id="model" 
                            name="model" 
                            type="text" 
                            value={formData.model} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {/* RAM */}
                    <div className="laptop-input">
                        <label htmlFor="ram"> RAM </label>
                        <input 
                            id="ram" 
                            name="ram" 
                            type="text" 
                            value={formData.ram} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {/* CPU */}
                    <div className="laptop-input">
                        <label htmlFor="cpu"> CPU </label>
                        <input 
                            id="cpu" 
                            name="cpu" 
                            type="text" 
                            value={formData.cpu} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {/* Storage */}
                    <div className="laptop-input">
                        <label htmlFor="storage"> Storage </label>
                        <input 
                            id="storage" 
                            name="storage" 
                            type="text" 
                            value={formData.storage} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {/* Price */}
                    <div className="laptop-input">
                        <label htmlFor="price"> Price </label>
                        <input 
                            id="price" 
                            name="price" 
                            type="number" 
                            value={formData.price} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {/* Image Preview */}
                    { imgPreview ? <img className="preview-image" src={imgPreview} alt="Laptop preview image"/> : '' }
                    {/* Image */}
                    <div className="image-input">
                        <label htmlFor="image"> Image </label>
                        <input 
                            id="image" 
                            name="image" 
                            type="file" 
                            onChange={handleImage}
                            accept="image/*" 
                            required
                        />
                    </div>
                    {/* Buttons */}
                    <div className="addlaptop-buttons">
                        <button type="reset" onClick={handleReset}> Clear </button>
                        <button type="submit"> Add </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}