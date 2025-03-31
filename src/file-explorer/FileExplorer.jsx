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
                if (operation === 'toggle')
                    return { ...explorerItem, state: toggleState(explorerItem.state) }
                else if (operation === 'add') {
                    if (info.type === 'file')
                        return { ...explorerItem, children: [...explorerItem.children, info] }
                    else if (info.type === 'folder')
                        return {
                            ...explorerItem, children: [...explorerItem?.children, {
                                ...info, children: [],
                                state: "collapse"
                            }]
                        }
                }
            }
            else if (explorerItem?.children?.length > 0) {
                return { ...explorerItem, children: updateFileExplorer({ fileExplorerData: explorerItem.children, name, ...extraInfo }) }
            }
            else return explorerItem
        })
    }
    const toggleState = (state) => state === 'expand' ? 'collapse' : 'expand'
    const handleFileExplorer = ({ name, ...extraInfo }) => {
        const tempFileExplorerData = structuredClone(fileExplorerData)
        const newFileExplorerData = updateFileExplorer({ fileExplorerData: tempFileExplorerData, name, ...extraInfo })
        setFileExplorerData(newFileExplorerData);
        // switch (type) {
        //     case 'add':
        //         break;
        //     case 'rename':
        //         break;
        //     case 'delete':
        //         break;
        //     case 'toggle':
        //         break;
        //     default:
        //         break;
        // }
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

const Folder = ({ name, handleFileExplorer, state }) => {
    const [inputInfo, setInputInfo] = useState({ visible: false, type: '' });
    const handleAdd = (e, type) => {
        e.stopPropagation();
        setInputInfo({ visible: true, type })
    }
    const addOnBlur = (newName, setNewName) => {
        handleFileExplorer({ name, operation: 'add', info: { type: inputInfo.type, name: newName } });
        setInputInfo({ visible: false, type: '' });
        setNewName('');
    }
    return <>
        <div key={name} className='folder' onClick={() => handleFileExplorer({ name, operation: 'toggle' })}> {state === 'expand' ? '-' : '+'} {name} <AiOutlineFileAdd size={15} onClick={(e) => handleAdd(e, 'file')} />
            <AiOutlineFolderAdd size={15} onClick={(e) => handleAdd(e, 'folder')} />
        </div>
        {inputInfo.visible && <AddInput onBlur={addOnBlur} />}
    </>
}

function ManageExplorer({ fileExplorerData, handleFileExplorer, depth = 0 }) {
    return (
        <div key={`parent-${depth}`} className='parentContainer' style={{ paddingLeft: depth + 'px' }}>
            {
                fileExplorerData.map(({ type, name, state = 'collapse', children = [] }) => {
                    switch (type) {
                        case 'file':
                            return <div key={name} className='file'>{name}</div>
                        case 'folder':
                            return <div className='parentContainer'>
                                <Folder name={name} handleFileExplorer={handleFileExplorer} state={state} />
                                {
                                    children.length > 0 && state === 'expand' && <ManageExplorer fileExplorerData={children} handleFileExplorer={handleFileExplorer} depth={depth + 20} />
                                }
                            </div>
                    }
                })
            }
        </div>
    )

}

export default FileExplorer;

