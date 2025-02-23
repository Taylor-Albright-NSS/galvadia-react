import { Keyword } from './models/keyword.js'; // Adjust the import path to your Keyword model
import { sequelize } from './config/db.js'; // Import your Sequelize instance

(async () => {
    // Add the testMethod to the Keyword prototype
    Keyword.prototype.testMethod = async function() {
        console.log(`Test method called for keyword: ${this.name}`);
    };

    // Create a test keyword instance
    const keyword = await Keyword.create({
    name: 'Test Lever',
    methodCode: 'pullLever',
    area_id: 1, // Ensure this area_id exists in your database
});

  // Call the testMethod
  await keyword.testMethod(); // Should log "Test method called for keyword: Test Lever"

  // Close the Sequelize connection
  await sequelize.close();
})();

(async () => {

    const keyword = await Keyword.create({
        name: `test execute`,
        area_id: 1,
    })
    
    await keyword.executeMethod()
    await sequelize.close()
    
})()
