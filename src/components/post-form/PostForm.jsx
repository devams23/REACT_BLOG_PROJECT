import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import service from "../../appwrite/mainconfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, Editrce, Select } from "../index";
function PostForm({ post }) {
  const {register , handleSubmit , watch ,control , getValues , setValue} = useForm({
    defaultValues: {
      title: post?.title || "",
      details: post?.details || "",
      slug: post?.slug || "",
      status: post?.status || "active",
      
    },
  });
  
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  const submit = async (data) => {
    if (post) {
        const file = data.image[0]
          ? await service.uploadfile(data.image[0])
          : null;

        if (file) {
          service.deletefile(post.featuredimage);
        }

        const dbPost = await service.updatepost(post.$id, {
          ...data,
          featuredimage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }

    else {
      const file = await service.uploadfile(data.image[0]);

      if (file) {
        data.featuredimage = file.$id;
        const dbPost = await service.createpost({
          ...data,
          
          userid: userData.$id
        });
        
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
      if (value && typeof(value)==="string") {
        return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
      }
      return "";
  }, [])
  
  useEffect(() => {
    const subscription = watch((value,{name})=>{
          if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
            
          }
          return () => subscription.unsubscribe()
    } )

  }, [watch , slugTransform, setValue])
  


  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Editrce
          label="Content :"
          name="details"
          control={control}
          defaultValue={getValues("details")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          classname="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getfilepreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          label="Status"
          options={["active", "inactive"]}
          classname="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgcolor={post ? "bg-green-500" : undefined}
          classname="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
