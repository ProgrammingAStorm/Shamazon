'use client'

import { sellerSelector } from "@/src/redux/slices/sellerSlice";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { fileToBase64, isFileAnImage } from "../../../src/file";
import { handleUpload } from "./actions";

export default function Upload() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState<FileList>();
    const [message, setMessage] = useState('');

    const seller = useSelector(sellerSelector);

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

        if (files!.length > 4) {
            setMessage("Maximum of 4 pictures may be uploaded at a time.");
            clearFileInput();
            return;
        }

        const fileStrings: string[] = [];

        for (let index = 0; index < files?.length!; index++) {
            const fileString = await fileToBase64(files?.item(index)!);

            const base64String = fileString?.split(',')[1];

            fileStrings.push(base64String!);
        }

        const data = await handleUpload({
            id: seller.seller?.Id!,
            name,
            price,
            description,
            fileStrings
        });
        console.log(data)

        // try {

        // } catch (error) {
        //     clearFileInput()
        //     setMessage("Images are too large. Please try less or smaller images.")
        //     return;
        // }

        // TODO handle different response codes


        clearForm();
    }

    function setFilesWithValidation(newFiles: FileList) {
        for (let index = 0; index < newFiles.length; index++) {
            const file = newFiles[index];

            if (!isFileAnImage(file)) {
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
        clearFileInput();
        setMessage('');
    }

    function clearFileInput() {
        const input: HTMLInputElement = document.querySelector('#file')!;
        input.value = '';
    }
}