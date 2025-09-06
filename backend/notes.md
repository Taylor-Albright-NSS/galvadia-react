✅ 1. Add a calculateDamageAgainst(enemy) method to GamePlayer
Instead of rawDamage, this method takes into account:

the weapon type of each swing (slashing/piercing/blunt),

the player’s armor penetration values,

the enemy’s resistances/armor,

and any modifiers (buffs, status effects, etc., later).

Example:
js
Copy
Edit
// Inside GamePlayer.js
calculateDamageAgainst(enemy, weapon) {
  const weaponType = weapon.Weapon?.damageType || 'unarmed'
  const rawDamage = this.getWeaponDamage(weapon)

  const playerPenetration = this.getPenetrationValue(weaponType)
  const enemyResistance = enemy.getArmorValue(weaponType)

  const effectiveArmor = Math.max(enemyResistance - playerPenetration, 0)
  const reducedDamage = Math.max(Math.floor(rawDamage - effectiveArmor), 1)

  return reducedDamage
}
✅ 2. Keep Damage Logic in GamePlayer, but Let Enemy Expose Armor Info
Your Enemy model should expose a simple method like:

js
Copy
Edit
getArmorValue(type) {
  switch (type) {
    case 'slashing': return this.armorSlashing || 0
    case 'piercing': return this.armorPiercing || 0
    case 'blunt': return this.armorBlunt || 0
    default: return 0
  }
}
This keeps things modular. GamePlayer handles damage output. Enemy just exposes defense values.

✅ 3. Then in your loop over swings, do:
js
Copy
Edit
for (const swing of swingResults) {
  const weapon = swing.weapon
  const damage = gamePlayer.calculateDamageAgainst(enemy, weapon)
  enemy.health = Math.max(enemy.health - damage, 0)
}


keyword = {
  name: 'keyword',
  event: 'lever',
}