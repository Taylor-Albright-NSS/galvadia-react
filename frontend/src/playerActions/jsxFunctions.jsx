export const playerUnpacksJSX = function (item) {
    return (<span>You unpack your <span className={item?.color || "green"}>{item.name}</span></span>)
}
export const playerPacksJSX = function (item) {
    return (<span>You put away your <span className={item?.color || "green"}>{item.name}</span></span>)
}
export const playerPicksUpItemJSX = function (item) {
    return (<span>You pick up the <span className={item?.color || "green"}>{item.name}</span></span>)
}
export const playerPicksUpAllItemsJSX = function () {
    return (<span>You pick up all items in the room and <span className='yellow'>X</span> gold</span>)
}


export const playerEquipsArmorJSX = function (equippedItem) {
    return (<span>You unequip your <span className={equippedItem?.color || "green"}>{equippedItem.name}</span></span>)
}
export const playerRemovesArmorJSX = function (removedItem) {
    return (<span>You remove your <span className={removedItem?.color || "green"}>{removedItem.name}</span></span>)
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