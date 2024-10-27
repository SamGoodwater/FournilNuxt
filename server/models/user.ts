import {Md5} from 'ts-md5';

type DataBaseType = Number | String | Boolean | null

class User {
  
    private _id: number = 0;
    private _uniqid: string = '';
    private _token: string = '';
    private _email: string = '';
    private _pseudo: string = 'Invité';
    private _hash: string = '';
    private _last_connexion: number = 0;
    private _timestamp_add: number = 0;
    private _is_admin: boolean = false;
  
    private _bookmark: any[] = [];
  
    constructor(data: DataBaseType) {

      this.hydrate(data);
      if (this._timestamp_add === 0 || this._timestamp_add === null) {
        this.set_timestamp_add();
      }
      if (this._last_connexion === 0 || this._last_connexion === null) {
        this.setLast_connexion();
      }

      // const className = this.constructor.name.toLowerCase();
      // const filesConfig: Record<string, FileConfig> = (this.constructor as any).FILES || {};
  
      // for (const [name, config] of Object.entries(filesConfig)) {
      //   if (config.naming && config.dir && config.type && config.default) {
      //     let path = FileManager.formatPath(config.dir);
      //     path += FileManager.solveNameFromPatternAndObject(this, config.naming);
      //     const isDir = config.is_dir || false;
  
      //     // Handle directories and files
      //     if (isDir) {
      //       path = FileManager.formatPath(path);
      //       this._files[name] = this.loadFilesFromDirectory(path, config.default, config.default_editable);
      //     } else {
      //       path = this.loadSingleFile(path, config.preferential_format, config.type, config.default, config.default_editable);
      //       this._files[name] = new File(path);
      //     }
      //   }
      // }

    }

    private hydrate(data: DataBaseType): void {
      if (data === null) {return;}
      
      for (const [key, value] of Object.entries(data)) {
        const methodName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (typeof (this as any)[methodName] === 'function') {
          (this as any)[methodName](value);
        }
      }
    }
  
    // Getters
    getId(): number {
      return this._id;
    }
    getUniqid(): string {
      return this._uniqid;
    }
    getToken(): string {
      return this._token;
    }
    getLast_connexion(format: string = Content.DATE_FR): number | string {
      return format ? new Date(this._last_connexion * 1000).toLocaleDateString() : this._last_connexion;
    }
    getTimestamp_add(format: string = Content.DATE_FR): number | string {
      return format ? new Date(this._timestamp_add).toLocaleDateString() : this._timestamp_add;
    }
    getEmail(): string {
      return this._email;
    }
    getPseudo(): string {
      return this._pseudo;
    }
    getName(): string {
      return this.getPseudo();
    }
    getHash(): string {
      return this._hash;
    }
    getIs_admin(): boolean {
          return this._is_admin;
    }
  
    isConnect(): boolean {
      return this.getEmail() !== '';
    }
  
    getBookmark(): any[] | string {
        return this._bookmark;
    }
  
    inBookmark(object: any): boolean {
      return this._bookmark.some(bookmark => bookmark.getUniqid() === object.getUniqid() && bookmark instanceof object.constructor);
    }
  
    // Setters
    setId(data: number): boolean {
      if ( data >= 0) {
        this._id = data;
        return true;
      }
      throw new Error("Id est incorrect");
    }
    setUniqid(data: string): boolean {
      this._uniqid = data;
      return true;
    }
    setToken(data: string): boolean {
      this._token = data;
      return true;
    }
    setLast_connexion(data: string = ''): boolean {
      if (!data) {
        this._last_connexion = Date.now() / 1000;
      } else {
        try {
          const date = new Date(data);
          this._last_connexion = date.getTime() / 1000;
        } catch (e) {
          return false;
        }
      }
      return true;
    }

    set_timestamp_add(data: string = ''): boolean {
      if (!data) {
        this._timestamp_add = Date.now();
      } else {
        const date = new Date(data);
        if (isNaN(date.getTime())) {
          throw new Error('La date de création est incorrecte (format ?)');
        }
        this._timestamp_add = date.getTime();
      }
      return true;
    }
  
    setEmail(data: string): boolean {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
      if (re.test(data)) {
        this._email = data;
        return true;
      } else {
        throw new Error("L'email n'est pas valide");
      }
    }
  
    setPseudo(data: string): boolean {
      this._pseudo = data;
      return true;
    }
  
    setHash(data: string): boolean {
      this._hash = data;
      return true;
    }
  
    setIsAdmin(data: boolean): boolean {
      this._is_admin = Boolean(data);
      return true;
    }
  
    setPassword(data: string): boolean {
      this._hash = this.hashPassword(data);
      return true;
    }
  
    setBookmark(obj: any, action: 'add' | 'remove' = 'add'): boolean {
      const name = `${obj.constructor.name}-${obj.getUniqid()}`;
      if (action === 'add') {
        this._bookmark.push(obj);
      } else if (action === 'remove') {
        this._bookmark = this._bookmark.filter(bookmark => bookmark.getUniqid() !== obj.getUniqid());
      }
      return true;
    }

    private hashPassword(password: string): string {
      return Md5.hashStr(password)
    }
  }
  