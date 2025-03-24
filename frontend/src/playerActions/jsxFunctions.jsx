export const playerUnpacksJSX = function (unpackedItem) {
    return (<span>You unpack your <span className={unpackedItem?.color || "green"}>{unpackedItem.name}</span></span>)
}
export const playerPacksJSX = function (packedItem) {
    return (<span>You put away your <span className={packedItem?.color || "green"}>{packedItem.name}</span></span>)
}

// ANOTHER
export const anotherUnpacksJSX = function (another, unpackedItem) {
    return (
    <span>
        <span className={another?.classColor}>{another.name} </span>unpacks his/her <span className={unpackedItem?.color || "green"}>{unpackedItem.name}</span>
    </span>
    )
}
export const anotherPacksJSX = function (another, packedItem) {
    return (
    <span>
        <span className={another?.classColor}>{another.name} </span>puts away his/her <span className={packedItem?.color || "green"}>{packedItem.name}</span>
    </span>
    )
}

export const playerDropsJSX = function(droppedItem) {
    return (<span>You drop your <span className={droppedItem?.color || "green"}>{droppedItem.name}</span></span>)
}

export const anotherDropsJSX = function(another, droppedItem) {
    return (
        <span>
            <span className={another?.classColor}>{another.name} </span>drops his/her <span className={droppedItem?.color || "green"}>{droppedItem.name}</span>
        </span>
    )
}