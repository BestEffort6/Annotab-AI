interface DataProps {
  id: string;
}

export interface DatasetProps {
  id: string;
  image: string;
  name: string;
  dataList: DataProps[];
  workflow: {
    id: string;
  };
  firstData: {
    file: {
      url: string;
    };
  };
}

export interface CreateDatasetFromData extends FormData {
  append(name: string, description?: string | Blob): void;
}
