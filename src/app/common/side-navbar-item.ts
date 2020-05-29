export class SideNavbarItem {

    private _itemText: string;
    
    private _itemUrl: string;
  

    constructor(itemText: string, itemUrl: string){
        this._itemText = itemText;
        this._itemUrl = itemUrl;
    }

    public get itemText(): string {
        return this._itemText;
    }
    public set itemText(value: string) {
        this._itemText = value;
    }  
    public get itemUrl(): string {
        return this._itemUrl;
    }
    public set itemUrl(value: string) {
        this._itemUrl = value;
    }
}
