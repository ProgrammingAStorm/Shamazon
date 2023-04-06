import { FormEvent, useRef, useState } from "react";
import { fileToBase64, isFileAnImage } from "../../utils/file";

export default function Upload() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState<FileList>();
    const [message, setMessage] = useState('');

    return <main>
        <form onSubmit={handleSubmit}>
            <input
                className="border-cyan-900 border m-1"
                value={name}
                type="text"
                placeholder="Name"
                name="Name"
                required
                onChange={e => setName(e.target.value)}
            />
            <textarea
                className="border-cyan-900 border m-1"
                value={description}
                placeholder="Description"
                name="Description"
                required
                onChange={e => setDescription(e.target.value)}
            />
            <input
                className="border-cyan-900 border m-1"
                value={price}
                type="number"
                placeholder="Price"
                name="Price"
                required
                onChange={e => setPrice(e.target.value)}
            />
            <input
                className="border-cyan-900 border m-1"
                id="file"
                type="file"
                placeholder="File"
                name="ImageUrl"
                required
                multiple
                onChange={e => setFilesWithValidation(e.target.files!)}
            />
            <button type="submit">Submit</button>

            {message === '' ? <p></p> : <p>{message}</p>}
        </form>
    </main>

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(files!.length > 4) {
            setMessage("Maximum of 4 pictures may be uploaded at a time.");
            clearFileInput();
            return;
        }

        const fileStrings: string[] = []

        for (let x = 0; x < files!.length; x++) {
            const base64String = await fileToBase64(files?.item(x));

            fileStrings.push(base64String!.toString());
        }

        const request = await fetch("/api/products/upload", {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Name: name,
                Description: description,
                Price: price,
                ImageUrls: fileStrings,
                // TODO needs to get name of product seller from token
                ProductSeller: "name"
            })
        });
        const response = await request.json();

        // TODO handle different response codes
        
        console.log(response)

        clearForm();
    }

    function setFilesWithValidation(newFiles: FileList) {
        for (let index = 0; index < newFiles.length; index++) {
            const file = newFiles[index];

            if(!isFileAnImage(file)) {
                setMessage("Please only upload images.");
                clearFileInput();
            }
        }

        setFiles(newFiles);
    }

    function clearForm() {
        setName('');
        setPrice('');
        setFiles(undefined);
        setDescription('');
        clearFileInput()
    }

    function clearFileInput() {
        const input: HTMLInputElement = document.querySelector('#file')!;
        input.value = '';
    }
}