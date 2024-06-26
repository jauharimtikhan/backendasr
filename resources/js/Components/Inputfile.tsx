import { ChangeEventHandler, useEffect, useRef, useState } from "react";

interface classer {
    title: string;
    labels: string;
    tooltips: string;
}

const Inputfile = ({
    label,
    labelInput,
    onChanges,
    imageReady,
}: {
    label: string;
    labelInput?: string | "Upload File";
    onChanges?: (e: any) => void;
    imageReady?: string | any;
}) => {
    const [clas, setClas] = useState<string>("");
    const [hiddenClass, setHiddenClass] = useState<string>("");
    const [images, setImages] = useState<string>("");
    const [imageClass, setImageClass] = useState<string>("");
    const [globClass, setGlobClass] = useState<classer>({
        title: "",
        tooltips: "",
        labels: "",
    });

    const inputFiles = useRef<HTMLInputElement>(null);
    const classes =
        "cursor-pointer flex items-center w-full h-full border border-gray-800 rounded-lg px-4 py-2 bg-gray-700 text-white hover:bg-gray-700 transition duration-300";

    const handlePreviewFile: ChangeEventHandler<HTMLInputElement | null> = (
        e
    ) => {
        const target = e.target;
        if (target.files && target.files[0]) {
            const classes =
                "cursor-pointer flex justify-center items-center w-full h-full border border-gray-800 rounded-lg px-4 py-2 bg-gray-700 text-white hover:bg-gray-700 transition duration-300";
            const reader = new FileReader();
            reader.onload = (event) => {
                setImages(event && (event.target?.result as string));
                setClas(classes);
                setImageClass("block");
                setHiddenClass("hidden");
                setGlobClass({
                    title: `${labelInput}`,
                    tooltips: "tooltips",
                    labels: "justify-center",
                });
            };
            reader.readAsDataURL(target.files[0]);
        }
    };

    const handleBrowse = () => {
        inputFiles.current && inputFiles.current.click();
    };

    const handleClose = () => {
        setImages("");
        setHiddenClass("block");
        setImageClass("hidden");
    };

    useEffect(() => {
        setClas(classes);
        setHiddenClass("block");
        setImageClass("hidden");
        setGlobClass({
            title: ``,
            tooltips: "",
            labels: "",
        });
        if (imageReady) {
            setImages(imageReady);
            setGlobClass({
                title: `${labelInput}`,
                tooltips: "tooltips",
                labels: "justify-center",
            });
            const imageUrl = import.meta.env.VITE_APP_URL + "/" + imageReady;
            setHiddenClass("hidden");
            setImageClass("block");
            if (imageReady.includes("https://")) {
                setImages(imageReady);
                setHiddenClass("hidden");
                setImageClass("block");
            } else if (imageReady.includes("storage/uploads/product")) {
                setImages(imageUrl);
                setHiddenClass("hidden");
                setImageClass("block");
            }
        }
    }, [
        setClas,
        classes,
        imageReady,
        setHiddenClass,
        setImageClass,
        setImages,
    ]);

    return (
        <div
            className={`relative ${globClass.tooltips}`}
            title={globClass.title}
        >
            <label htmlFor="file-upload" className="mb-2">
                {label}
            </label>
            <div className="bg-gray-800 rounded-lg border-gray-800 ">
                <input
                    type="file"
                    ref={inputFiles}
                    className="hidden"
                    onChange={(e) => {
                        onChanges && onChanges(e);
                        handlePreviewFile(e);
                    }}
                />
                <div className="bg-gray-700 px-2 py-2 rounded-lg relative grid grid-flow-row grid-cols-1">
                    <div onClick={handleBrowse}>
                        <label
                            htmlFor="file-upload"
                            className={`flex items-center cursor-pointer ${globClass.labels}`}
                        >
                            <svg
                                height={"800px"}
                                width={"800px"}
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 312.602 312.602"
                                className={`w-6 h-6 mr-2 ${hiddenClass}`}
                            >
                                <path
                                    style={{ fill: "#fefefe" }}
                                    d="M251.52,137.244c-3.966,0-7.889,0.38-11.738,1.134c-1.756-47.268-40.758-85.181-88.448-85.181
	c-43.856,0-80.964,32.449-87.474,75.106C28.501,129.167,0,158.201,0,193.764c0,36.106,29.374,65.48,65.48,65.48h54.782
	c4.143,0,7.5-3.357,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5H65.48c-27.835,0-50.48-22.645-50.48-50.48c0-27.835,22.646-50.48,50.48-50.48
	c1.367,0,2.813,0.067,4.419,0.206l7.6,0.658l0.529-7.61c2.661-38.322,34.861-68.341,73.306-68.341
	c40.533,0,73.51,32.977,73.51,73.51c0,1.863-0.089,3.855-0.272,6.088l-0.983,11.968l11.186-4.367
	c5.356-2.091,10.99-3.151,16.747-3.151c25.409,0,46.081,20.672,46.081,46.081c0,25.408-20.672,46.08-46.081,46.08
	c-0.668,0-20.608-0.04-40.467-0.08c-19.714-0.04-39.347-0.08-39.999-0.08c-4.668,0-7.108-2.248-7.254-6.681v-80.959l8.139,9.667
	c2.667,3.17,7.399,3.576,10.567,0.907c3.169-2.667,3.575-7.398,0.907-10.567l-18.037-21.427c-2.272-2.699-5.537-4.247-8.958-4.247
	c-3.421,0-6.686,1.548-8.957,4.247l-18.037,21.427c-2.668,3.169-2.262,7.9,0.907,10.567c1.407,1.185,3.121,1.763,4.826,1.763
	c2.137,0,4.258-0.908,5.741-2.67l7.901-9.386v80.751c0,8.686,5.927,21.607,22.254,21.607c0.652,0,20.27,0.04,39.968,0.079
	c19.874,0.041,39.829,0.081,40.498,0.081c33.681,0,61.081-27.4,61.081-61.08C312.602,164.644,285.201,137.244,251.52,137.244z"
                                />
                            </svg>
                            <span className={hiddenClass}>{labelInput}</span>
                            <img
                                src={images}
                                alt=""
                                className={`w-28 h-28 rounded-lg ${imageClass} `}
                            />
                        </label>
                    </div>
                    <span
                        onClick={() => handleClose()}
                        style={{ borderRadius: "50%" }}
                        className={`text-gray-800 dark:text-gray-200 ${imageClass}  absolute right-1 top-1 text-center  w-6 h-6 flex items-center justify-center hover:bg-red-500  cursor-pointer z-[9999999]`}
                    >
                        x
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Inputfile;
