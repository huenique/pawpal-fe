import { DataView } from "primereact/dataview";
import PostService from "../service/PostService";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


export default function Missing() {

  const [post, setPost] = useState([]);
  const [view, setView] = useState(false);

  useEffect(() => {
      PostService.getPosts().then((data) => setPost(data));
  }, []);

  const feedTemplate = (_post) => {
    return (
      <li class="py-3 border-bottom-1 surface-border flex w-full md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
          <div>
            <span class="text-900 font-medium block mb-2">
              {_post.name}
            </span>
            <div class="text-700 mb-2">{_post.description}</div>
            <a class="text-primary cursor-pointer" href={_post.attachment}>
              <span>{_post.attachment}</span>
            </a>
          </div>
        </div>
        <span class="block text-500 font-medium">
          date created
        </span>
      </li>
    );
  };

  const viewFooterDialog = (
      <div>
        <Button
          label="Post"
          icon="pi pi-check"
          onClick={() => {
            setView(false);
          }}
          severity="primary"
        />
      </div>
  );

  return (
    <div className="flex flex-column">
      <div className="justify-content-center py-4 px-8 mx-8">
        <div className="px-8">
          <span className="block text-4xl font-bold text-center">
            Help Us Find Our Furry Friends!
          </span>
        </div>
        <div className="px-8 pt-6">
          <span className="block text-2xl text-center">
            This page aids in the search for missing pets. Share information,
            help reunite pets with their families, and bring our furry friends
            home!
          </span>
        </div>
        <div className="pt-4 flex justify-content-end">
          <Button
            label="Report a Missing Pet"
            onClick={() => {setView(true)}}
          />
        </div>
        <div className="card flex justify-content-center pt-4">
          <div class="surface-card shadow-2 border-round p-4 w-full">
            <ul class="list-none p-0 m-0">
              <DataView value={post} itemTemplate={feedTemplate} />
            </ul>
          </div>
        </div>
      </div>

      <Dialog
          header="Report a Missing Pet"
          visible={view}
          className="p-fluid"
          style={{ width: "50vw" }}
          onHide={() => {
            setView(false);
          }}
          footer={viewFooterDialog}
      >
          <div className="flex flex-column p-3 overflow-y-auto max-h-25rem">
            <div className="flex m-2 align-items-center justify-content-center surface-card shadow-2 border-round p-4">
              <div className="col flex flex-column align-items-start">
                <label htmlFor='name' className="text-900 font-medium mb-2">
                  Name
                </label>
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    name="name"
                  />
                </span>
                <label htmlFor='desc' className="text-900 font-medium my-2">
                  Description
                </label>
                <span className="p-input-icon-left">
                  <i className="pi pi-info-circle" />
                  <InputText
                    name="desc"
                  />
                </span>
                <label htmlFor='desc' className="text-900 font-medium my-2">
                  Attachment
                </label>
                <span className="p-input-icon-left">
                  <i className="pi pi-paperclip" />
                  <InputText
                    name="desc"
                  />
                </span>
              </div>
            </div>
          </div>
      </Dialog>
    </div>
  );
}
