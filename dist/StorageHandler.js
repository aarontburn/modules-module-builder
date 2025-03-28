"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageHandler = void 0;
const fs = require("fs");
const os = require("os");
class StorageHandler {
    static PATH = os.homedir() + (!process.argv.includes('--dev') ? "/.modules/" : '/.modules_dev/');
    static STORAGE_PATH = this.PATH + "/storage/";
    static EXTERNAL_MODULES_PATH = this.PATH + "/external_modules/";
    static COMPILED_MODULES_PATH = this.PATH + "/built/";
    /**
     *  Creates necessary directories. Should not be called by any module.
     */
    static async _createDirectories() {
        await Promise.all([
            fs.promises.mkdir(this.PATH, { recursive: true }),
            fs.promises.mkdir(this.STORAGE_PATH, { recursive: true }),
            fs.promises.mkdir(this.EXTERNAL_MODULES_PATH, { recursive: true }),
            fs.promises.mkdir(this.COMPILED_MODULES_PATH, { recursive: true })
        ]);
    }
    /**
     *  Write to a modules storage.
     *
     *  @param module   The source module.
     *  @param fileName The name of the file, including file extension.
     *  @param contents The contents to write in the file.
     */
    static async writeToModuleStorage(module, fileName, contents) {
        const dirName = module.getIPCSource();
        const folderName = this.STORAGE_PATH + dirName + "/";
        const filePath = folderName + fileName;
        await fs.promises.mkdir(folderName, { recursive: true });
        await fs.promises.writeFile(filePath, contents);
    }
    /**
     *  Writes the module settings to storage.
     *
     *  @param module The source module.
     */
    static writeModuleSettingsToStorage(module) {
        const settingMap = new Map();
        module.getSettings().getSettings().forEach((setting) => {
            settingMap.set(setting.getName(), setting.getValue());
        });
        this.writeToModuleStorage(module, module.getSettingsFileName(), JSON.stringify(Object.fromEntries(settingMap), undefined, 4));
    }
    /**
     *  Reads a file from the modules storage.
     *
     *  @param module   The source module.
     *  @param fileName The name of the file to read.
     *  @param encoding The file encoding. Default is 'utf-8'
     *  @returns        The contents of the file, or null if there was an error reading it.
     */
    static readFromModuleStorage(module, fileName, encoding = 'utf-8') {
        const dirName = module.getIPCSource();
        const folderName = this.STORAGE_PATH + dirName + "/";
        const filePath = folderName + fileName;
        try {
            const content = fs.readFileSync(filePath, { encoding: encoding });
            return content;
        }
        catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
            console.log("File not found: " + filePath);
        }
        return null;
    }
    /**
     *  Read settings from module storage.
     *
     *  @param module The source module
     *  @returns A map of setting names to the setting.
     */
    static readSettingsFromModuleStorage(module) {
        const settingMap = new Map();
        const dirName = module.getIPCSource();
        const folderName = this.STORAGE_PATH + dirName + "/";
        const filePath = folderName + module.getSettingsFileName();
        let contents;
        try {
            contents = fs.readFileSync(filePath, 'utf-8');
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            console.log("WARNING: directory not found.");
            return settingMap;
        }
        try {
            const json = JSON.parse(contents);
            for (const settingName in json) {
                settingMap.set(settingName, json[settingName]);
            }
        }
        catch (err) {
            console.error("Error parsing JSON for setting: " + module.getName());
        }
        return settingMap;
    }
}
exports.StorageHandler = StorageHandler;
