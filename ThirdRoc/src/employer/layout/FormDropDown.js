import { useEffect, useState } from 'react';
import { useDrop } from 'react-use';

const FormDropDown = ({ GetImg }) => {
    const [Img, setImg] = useState([]);

    const state = useDrop({
        onFiles: files => setImg(files),
    });

    useEffect(() => {
        GetImg(Img)
    }, [Img]);


    return (
        <>
            <div className="form-group drop_con">
                <label className="form-label">Drop file here or</label>
                <div className="row g-xs">
                    <div className="wd-200 mg-b-30">
                        <div className="input-group">
                            <button style={{ zIndex: 0 }} className='btn btn-outline-primary rounded-0 p-0' type="button">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImg(e.target.files)}
                                    multiple
                                />
                                <span>Select Files</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* {Img.length > 0 && <p>{Img.length} files selected.</p>} */}
            </div>
        </>
    );
}

export default FormDropDown;