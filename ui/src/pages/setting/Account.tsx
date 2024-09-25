import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getErrMessage } from "@/lib/error";
import { getPb } from "@/repository/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("请输入正确的邮箱"),
});

const Account = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [changed, setChanged] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: getPb().authStore.model?.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await getPb().admins.update(getPb().authStore.model?.id, {
        email: values.email,
      });

      getPb().authStore.clear();
      toast({
        title: "修改账户邮箱功",
        description: "请重新登录",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (e) {
      const message = getErrMessage(e);
      toast({
        title: "修改账户邮箱失败",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="w-full md:max-w-[35em]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 dark:text-stone-200"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入邮箱"
                      {...field}
                      type="email"
                      onChange={(e) => {
                        setChanged(true);
                        form.setValue("email", e.target.value);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              {changed ? (
                <Button type="submit">确认修改</Button>
              ) : (
                <Button type="submit" disabled variant={"secondary"}>
                  确认修改
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Account;