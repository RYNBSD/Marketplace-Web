type Fail = {
  success: false;
  message: string;
};

type ResponseBody = Record<string, any>;

type Success = {
  success: true;
  data: ResponseBody | ResponseBody[];
};

export type Response = {
  Fail: Fail;
  Success: Success;
};
