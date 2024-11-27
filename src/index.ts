import { initDB } from "./database/db";
import { mainMenu } from "./application/prompts";

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