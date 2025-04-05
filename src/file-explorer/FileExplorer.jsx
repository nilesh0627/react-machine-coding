import { useState } from 'react';

import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineFolderAdd } from "react-icons/ai";


import FileExplorerData from './data.json'

import "../App.css";

function FileExplorer() {
    const [fileExplorerData, setFileExplorerData] = useState(() => FileExplorerData)
    const updateFileExplorer = ({ fileExplorerData, name, ...extraInfo }) => {
        // type: toggle, file add, folder add, rename file, rename folder, delete file, delete folder
        return fileExplorerData.map(explorerItem => {
            if (explorerItem.name === name) {
                const { operation = '', info = {} } = extraInfo
                if (operation === 'add') {
                    if (info.type === 'file')
                        return { ...explorerItem, children: [info, ...explorerItem.children] }
                    else if (info.type === 'folder')
                        return {
                            ...explorerItem, children: [{
                                ...info, children: [],
                            }, ...explorerItem?.children]
                        }
                }
            }
            else if (explorerItem?.children?.length > 0) {
                return { ...explorerItem, children: updateFileExplorer({ fileExplorerData: explorerItem.children, name, ...extraInfo }) }
            }
            else return explorerItem
        })
    }
    const handleFileExplorer = ({ name, ...extraInfo }) => {
        const tempFileExplorerData = structuredClone(fileExplorerData)
        const newFileExplorerData = updateFileExplorer({ fileExplorerData: tempFileExplorerData, name, ...extraInfo })
        setFileExplorerData(newFileExplorerData);
    }

    return (
        <section>
            <h1>File Explorer</h1>
            <ManageExplorer fileExplorerData={fileExplorerData} handleFileExplorer={handleFileExplorer} />
        </section>
    );
}

const AddInput = ({ onBlur }) => {
    const [name, setName] = useState('');
    return (
        <article className='addInput'>
            <input value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => {
                e.preventDefault();
                onBlur(name, setName)
            }} />
        </article>
    )
}

const Folder = ({ name, handleFileExplorer, isExpanded, setIsExpanded }) => {
    const [inputInfo, setInputInfo] = useState({ visible: false, type: '' });
    const handleAdd = (e, type) => {
        e.stopPropagation();
        setIsExpanded(isExpanded => ({ ...isExpanded, [name]: true }))
        setInputInfo({ visible: true, type })
    }
    const addOnBlur = (newName, setNewName) => {
        handleFileExplorer({ name, operation: 'add', info: { type: inputInfo.type, name: newName } });
        setInputInfo({ visible: false, type: '' });
        setNewName('');
    }
    return <> <span onClick={() => setIsExpanded(isExpanded => ({ ...isExpanded, [name]: !isExpanded[name] }))}>
        <span >{isExpanded?.[name] ? '-' : '+'}</span>
        <span key={name} className='folder'>{name}</span>
    </span>
        <AiOutlineFileAdd size={15} onClick={(e) => handleAdd(e, 'file')} />
        <AiOutlineFolderAdd size={15} onClick={(e) => handleAdd(e, 'folder')} />
        {inputInfo.visible && <AddInput onBlur={addOnBlur} />}
    </>

}

function ManageExplorer({ fileExplorerData, handleFileExplorer }) {
    const [isExpanded, setIsExpanded] = useState({});
    return (
        <div className='parentContainer'>
            {
                fileExplorerData.map(({ type, name, children = [] }) => {
                    return <div key={name}>
                        {type === 'file' && <span key={name} className='file'>{name}</span>}
                        {type === 'folder' && <Folder name={name} handleFileExplorer={handleFileExplorer} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />}
                        {
                            children.length > 0 && isExpanded?.[name] && <ManageExplorer fileExplorerData={children} handleFileExplorer={handleFileExplorer} />
                        }
                    </div>
                })
            }
        </div>
    )

}

export default FileExplorer;

