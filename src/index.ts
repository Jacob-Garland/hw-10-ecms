import { initDB } from "./database/db.js";
import { mainMenu } from "./application/prompts.js";

const runApp = async () => {
    console.log('Starting Employee Management System...');
    try {
        await initDB();
        await mainMenu();
    } catch (err) {
        console.error('Error occured starting the application...', err);
    } finally {
        console.log('Exiting EMS. Goodbye!');
        process.exit();
    }
};

runApp();