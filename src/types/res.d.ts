type Fail = {
  success: false;
  message: string;
};

type ResponseBody = Record<string, unknown>;

type Success = {
  success: true;
  data: ResponseBody | ResponseBody[];
};

export type Response = {
  Fail: Fail;
  Success: Success;
};
