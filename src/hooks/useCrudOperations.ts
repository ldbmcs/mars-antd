import { message } from 'antd';

type AddApiFunction<T> = (fields: T) => Promise<any>;
type UpdateApiFunction<T> = (id: string, fields: T) => Promise<any>;
type RemoveApiFunction = (ids: string) => Promise<any>;
type EnableApiFunction = (id: string) => Promise<any>;
type DisableApiFunction = (id: string) => Promise<any>;

export function useCrudOperations<T>(
  addApi: AddApiFunction<T>,
  updateApi: UpdateApiFunction<T>,
  removeApi: RemoveApiFunction,
  enableApi?: EnableApiFunction,
  disableApi?: DisableApiFunction,
) {
  const handleAdd = async (fields: T) => {
    const hide = message.loading('正在添加');
    try {
      await addApi(fields);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败，请重试！');
      return false;
    }
  };

  const handleUpdate = async (id: string | undefined, fields: T) => {
    const hide = message.loading('正在修改');
    try {
      await updateApi(id!, fields);
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      message.error('修改失败，请重试！');
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
      message.error('删除失败，请重试！');
      return false;
    }
  };

  const handleEnable = async (id: string | undefined) => {
    if (!enableApi) return false;
    const hide = message.loading('正在启用');
    try {
      await enableApi(id!);
      hide();
      message.success('启用成功');
      return true;
    } catch (error) {
      hide();
      message.error('启用失败，请重试！');
      return false;
    }
  };

  const handleDisable = async (id: string | undefined) => {
    if (!disableApi) return false;
    const hide = message.loading('正在禁用');
    try {
      await disableApi(id!);
      hide();
      message.success('禁用成功');
      return true;
    } catch (error) {
      hide();
      message.error('禁用失败，请重试！');
      return false;
    }
  };

  return { handleAdd, handleUpdate, handleDelete, handleEnable, handleDisable };
}
