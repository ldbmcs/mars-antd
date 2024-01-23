import { message } from 'antd';

type AddApiFunction<T> = (fields: T) => Promise<any>;
type UpdateApiFunction<T> = (params: any, fields: T) => Promise<any>;
type RemoveApiFunction = (params: any) => Promise<any>;
type ToggleApiFunction = (params: any) => Promise<any>;

export function useCrudOperations<TAdd, TUpdate>(
  addApi: AddApiFunction<TAdd>,
  updateApi: UpdateApiFunction<TUpdate>,
  removeApi: RemoveApiFunction,
  toggleApi?: ToggleApiFunction,
) {
  const handleAdd = async (fields: TAdd) => {
    const hide = message.loading('正在添加');
    try {
      await addApi(fields);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const handleUpdate = async (id: string | undefined, fields: TUpdate) => {
    const hide = message.loading('正在修改');
    try {
      await updateApi(id!, fields);
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const handleDelete = async (ids: string) => {
    const hide = message.loading('正在删除');
    try {
      await removeApi(ids);
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const handleToggle = async (params: any) => {
    if (!toggleApi) return false;
    const hide = message.loading('正在修改');
    try {
      await toggleApi(params);
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  return { handleAdd, handleUpdate, handleDelete, handleToggle };
}
