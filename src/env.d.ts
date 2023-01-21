interface ImportMetaEnv {
  readonly REACT_API_URL: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
