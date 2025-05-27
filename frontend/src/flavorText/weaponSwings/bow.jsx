export const bowSwing = (damageObject) => {
    const { weapon, enemy, damageType, swingVerb, preposition, actualDamage, blockedDamage} = damageObject
    console.log(weapon, ' weapon')
    console.log(enemy, ' enemy')
    return (
        <span style={{display: 'flex', flexDirection: 'column', marginTop: '5px', marginBottom: '5px'}}>
            <span style={{display: 'inline'}}>
                <span className="light-blue">You </span>
                <span>{swingVerb} your </span> 
                <span className={weapon?.color || 'green'}>{weapon.name} </span>
                <span>{preposition} the </span>
                <span className={enemy?.color || 'red'}>{enemy.name}</span>
                <span>!</span>
            </span>

            <span style={{display: 'inline'}}>
            <span> </span>
                <span className='green'>You </span>
                <span>hit for </span> 
                <span className='light-blue'>{actualDamage} </span> 
                <span className={damageType}>{damageType} </span>
                <span>damage </span> 
                <span>{`(Enemy's armor blocks `}</span>
                <span className='light-blue'>{blockedDamage}</span>{`)`}
            </span>
        </span>
    )
}