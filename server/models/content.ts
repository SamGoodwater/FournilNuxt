
class Content {
  static readonly DATE_DB = "Y-m-d";
  static readonly DATE_TIME_DB = "Y-m-d H:i:s";
  static readonly DATE_FR = "d-m-Y";
  static readonly TIME_FR = "H:i:s";
  static readonly DATE_TIME_FR = "H:i:s d-m-Y";

  static readonly PATH_FILE_GENERAL_DEFAULT = "medias/no_file_found_logo.svg";

  protected _id: string = '';
  protected _uniqid: string = '';
  protected _timestamp_add: number = 0;
  protected _timestamp_updated: number = 0;
  protected _usable: boolean = false;
  protected _files: Record<string, File | File[]> = {};

  constructor(data: Record<string, any> = {}) {

  }

}
