

export interface UploadFile {
	fileName: string;
	formData: FormData;
	contentType: string;
}

export interface ImageUploaderParam {
	imageUploadPath: string;
	httpMethod: string;
	file: UploadFile;
	// userParameter: any
}

// Custom image uploader
export type ImageUploader = (param: ImageUploaderParam) => string;
