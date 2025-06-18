//NPC IDs
// 1 = Joch
// 2 = Clyde
// 3 = Egbert
module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert(
			'NpcDialogues',
			[
				{
					id: 1, //Joch
					npcId: 1,
					dialogueStage: 1,
					dialogue: [`Hello, my name is Joch!`, `I am a weaponsmith, but I have not yet been programmed to sell weapons!`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					npcId: 1, //Joch
					dialogueStage: 2,
					dialogue: [`Clyde here is my brother.`, `He sells armor.`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					npcId: 2, //Clyde
					dialogueStage: 1,
					dialogue: [`Hello, my name is Clyde!`, `I am an Armorsmith, but I have not yet been programmed to sell armor!`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 4,
					npcId: 2, //Clyde
					dialogueStage: 2,
					dialogue: [`Joch here is my brother.`, `He sells weapons.`],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 5,
					npcId: 3, //Egbert
					dialogueStage: 1,
					dialogue: [
						[
							`Thank you for waiting, {playerName}. Your patience is appreciated. It's time we get started with your final training. Once you complete every task, you'll be more than ready to join the {playerGuild}'s Guild.`,
							`Before moving forward, I'd like to explain to you a few basics of getting around. You can travel by typing the direction you want to move. You can abbreviate any direction such as "n" for north or "ne" for northeast. A room will list all possible directions you can travel next to "Exits" underneath its description.`,
							`As you can see, directions are labeled by their color. Green means you can travel freely in that direction, yellow indicates a locked door that can be opened with a key, and red means you must complete a quest, obtain a certain level, or reach a certain level in progression to pass through. Most directions will be green, but for the sake of training, you will encounter several restricted directions. `,
							`Your first task, speaking with me, has been completed. You can refresh your view of a room by using the LOOK or L command which will update your view of the room if any changes have occurred. Now that you have spoken to me, you are free to travel to the west where your next task awaits!`,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 6,
					npcId: 3, //Egbert
					dialogueStage: 2,
					dialogue: [[`Rooms have keywords. Try examining the wall!`]],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 7,
					npcId: 3, //Egbert
					dialogueStage: 3,
					dialogue: [[`Excellent! Let's proceed.`]],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 8,
					npcId: 3, //Egbert
					dialogueStage: 4,
					dialogue: [[`Some keywords require a special action to activate. Examining a keyword will sometimes offer you a clue on how to open it. Go ahead and examine the lever.`]],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 9,
					npcId: 3, //Egbert
					dialogueStage: 5,
					dialogue: [
						[
							`Many people throughout the lands will have quests to offer you. To view quest details, use the QUEST command. If there are multiple people in the same room offering a quest, you will have to specify QUEST followed by the quest giver's name.`,
							`Quests do not require speaking to the quest giver before completing them. That is to say, as long as you have completed the quest objective, you can complete it by returning to the quest giver and using the OFFER command. If there are multiple quest givers in the same room, you will have to specify OFFER followed by the quest giver's name.`,
							`Go ahead and check out the quest I have to offer.`,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 10,
					npcId: 3, //Egbert
					dialogueStage: 6,
					dialogue: [[`Reading signs is a great way to find your way around. Go ahead and read the sign here by using the READ SIGN command.`]],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 11,
					npcId: 3, //Egbert
					dialogueStage: 7,
					dialogue: [[`That's it for now. Let's return to the main room. From there, we'll get you ready for combat training!`]],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 12,
					npcId: 3, //Egbert
					dialogueStage: 8,
					dialogue: [[`Alright, let's get you combat ready. Before I can teach you the basics of combat, we need to get you some equipment. The room to the right is the equipment room. Meet me in there, and I will show you how to equip items.`]],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 13,
					npcId: 3, //Egbert
					dialogueStage: 9,
					dialogue: [
						[
							`There's a few things to go over. You probably noticed the equipment on the ground. Anything on the ground can be picked up. Use the GET command followed by any word in the item's name to pick it up. When you pick up an item, it will be added to your inventory. You cannot equip an item straight from your inventory. You first must hold it in either hand before doing so. To get an item from your inventory to your hand, use the UNPACK command followed by either any word in the item's name or by the inventory slot number. If you want to put away an item you're holding, use the PACK command. You can specify RIGHT or LEFT to put away an item from whichever hand. You can also specify any word in the item's name.`,
							`Now, to equip something, make sure you are holding it first, then use any of these commands EQUIP DON or WEAR followed by any word in the item's name. You can also specify RIGHT or LEFT.`,
							`To remove an item, make sure you have at least one empty hand, then use the REMOVE command followed by any word in the item's name. The will remove your armor and place it in one of your free hands.`,
							`If you forget any of these commands, you can return here and read the sign. When you're ready, meet me in the room twice west of here.`,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 14,
					npcId: 3, //Egbert
					dialogueStage: 10,
					dialogue: [
						[
							`Go ahead and pick up this weapon. Equipping a weapon is a little different. As long as you're holding a weapon in either hand, it is considered equipped. Using the EQUIP command to try to equip a weapon will do nothing. Equipping a weapon is very important for combat. Though you can fight with your hands, they will do very little damage compared to a weapon, unless you are a Monk.`,
							`Alright, let's move on. Meet me in the room to the east, then north.`,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 15,
					npcId: 3, //Egbert
					dialogueStage: 11,
					dialogue: [
						[
							`The combat training room is completely safe. You don't have to worry about the training dummies attacking you. They're just dummies! Out in the world, enemies only exist in hostile areas and only have a chance of spawning each time you enter a room, which we will cover more in-depth later. These training dummies are already spawned and cannot move. You can hit them as much as you'd like.`,
							`Ok, let's get to combat.`,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 16,
					npcId: 3, //Egbert
					dialogueStage: 12,
					dialogue: [
						[
							`To attack an enemy, you first have to be in combat with it. You can do this by advancing it with the ADVANCE or AD command. Out in the world, you can also wait for an enemy to engage you first. Both have their strategic advantages which we will cover later.`,
							`Once you are in combat, you can attack the enemy with the ATTACK or A command. You can only attack every so many seconds. Between attacks, you will not be able to perform any other action, except skills, which we will cover later. Only when your swing timer has reached 0 can you perform another non-skill action.`,
							``,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 17,
					npcId: 3, //Egbert
					dialogueStage: 13,
					dialogue: [
						[
							`To hit an enemy, you first have to be in combat with that enemy. To engage combat, you can either let an enemy advance you first or you can engage the enemy with the ADVANCE or AD command. Since these training dummies aren't alive, they won't engage you, so you'll have to engage them.`,
						],
					],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('NpcDialogues', null, {})
	},
}
