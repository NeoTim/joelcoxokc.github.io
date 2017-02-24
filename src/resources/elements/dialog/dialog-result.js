export class DialogResult {
    
    result = {};
    warning = false;
    error = false;
    wasCancelled = true;

    constructor(instruction) {
        Object.assign(this, instruction);
    }
}