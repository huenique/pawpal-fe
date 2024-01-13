import { useEffect, useState, useRef } from "react";
import {Button} from 'primereact/button';
import {Carousel} from 'primereact/carousel';
import ProductService from '../service/ProductService';
import { Dialog } from "primereact/dialog";
import ImageService from "../service/ImageService";
import { DataView } from "primereact/dataview";
import React from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";


export default function Adopt() {
    const [pets, setPets] = useState([]);
    const [basketPets, setBasketPets] = useState([]);
    const [products, setProducts] = useState([]);
    const [view, setView] = useState(false);

    const toast = useRef(null);

    const toastSuccess = () => {
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: `Pet has been successfully added to basket.`,
        life: 2000,
      });
    };

  const toastError = (detail) => {
      toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${detail}.`,
          life: 2000,
      });
  };

  const reject = () => {
      toast.current.show({
        severity: "warn",
        summary: "Rejected",
        detail: "You have rejected",
        life: 2000,
      });
    };

    // const fetchPets = async () => {
    //   try {
    //     const data = await petService.retrievePets();
    //     const pets = data.data;
  
    //     setPets(pets);
    //   } catch (error) {
    //     toastError("An unexpected error occured");
    //   }
    // };
  
    // useEffect(() => {
    //   fetchPets();
    // }, []);

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const addToBasket = (product) => {
      const _basketPets = [...basketPets];
      _basketPets.push(product);
      toastSuccess();
      setBasketPets(_basketPets);
    };

    const productTemplate = (product) => {

        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={product.image} alt={product.name} style={{objectFit: 'cover', width: '300px', height: '300px'}} className="w-6 shadow-2" />
                </div>
                <div>
                    <h3 className="mb-1">{product.name}</h3>
                    <h6 className="mt-0 mb-3">{product.breed}</h6>
                    <span className="mt-0 mb-3">{product.description}</span>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-shopping-cart mr-2" className="p-button p-button" onClick={() => confirm_add_to_basket(`Add ${product.name} to list of adoptables?`, product)}>Adopt Now</Button>
                    </div>
                </div>
            </div>
        );
    };

    const confirm_add_to_basket = (message, product) => {
        confirmDialog({
            message: `${message}`,
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            position: "top",
            accept: () => addToBasket({ ...product }),
          });
    }

    const viewFooterDialog = (
        <div>
          <Button
            label="Adopt Now"
            icon="pi pi-check"
            onClick={() => {
              setView(false);
            }}
            severity="primary"
          />
        </div>
    );

    const basketTemplate = (_pets) => {
      return (
        <div className="flex w-full m-2 align-items-center justify-content-center surface-card shadow-2 border-round p-4">
          <img
            src={_pets.image}
            className="mr-4"
            alt="1"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div className="col flex flex-column align-items-start">
            <span className="text-1000 flex-wrap font-medium mb-2">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M0 252.1V48C0 21.5 21.5 0 48 0h204.1a48 48 0 0 1 33.9 14.1l211.9 211.9c18.7 18.7 18.7 49.1 0 67.9L293.8 497.9c-18.7 18.7-49.1 18.7-67.9 0L14.1 286.1A48 48 0 0 1 0 252.1zM112 64c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"/></svg>
              {_pets.name}
            </span>
            <span className="text-1000 flex-wrap font-medium mb-2">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M360 0H24C10.7 0 0 10.7 0 24v16c0 13.3 10.7 24 24 24 0 91 51 167.7 120.8 192C75 280.3 24 357 24 448c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24 0-91-51-167.7-120.8-192C309 231.7 360 155 360 64c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24zm-75.1 384H99.1c17.1-46.8 52.1-80 92.9-80 40.8 0 75.9 33.2 92.9 80zm0-256H99.1C92 108.5 88 86.7 88 64h208c0 22.8-4 44.6-11.1 64z"/></svg>
              {_pets.age}
            </span>
            <span className="text-1000 flex-wrap font-medium mb-2">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M564 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C422.5 72.1 396.2 64 368 64c-33.7 0-64.6 11.6-89.2 30.9 14 16.7 25 36 32.1 57.1 14.5-14.8 34.7-24 57.1-24 44.1 0 80 35.9 80 80s-35.9 80-80 80c-22.3 0-42.6-9.2-57.1-24-7.1 21.1-18 40.4-32.1 57.1 24.5 19.4 55.5 30.9 89.2 30.9 79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 64C64.5 64 0 128.5 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.6 112-71.9 112-140.4 0-79.5-64.5-144-144-144zm0 224c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/></svg>
              {_pets.gender}
            </span>
            <span className="text-1000 flex-wrap font-medium mb-2">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 224c-79.4 0-192 122.8-192 200.3 0 34.9 26.8 55.8 71.7 55.8 48.8 0 81.1-25.1 120.3-25.1 39.5 0 71.9 25.1 120.3 25.1 44.9 0 71.7-20.9 71.7-55.8C448 346.8 335.4 224 256 224zm-147.3-12.6c-10.4-34.7-42.4-57.1-71.6-50.1-29.1 7-44.3 40.7-33.9 75.3 10.4 34.7 42.4 57.1 71.6 50.1 29.1-7 44.3-40.7 33.9-75.3zm84.7-20.8c30.9-8.1 46.4-49.9 34.6-93.4s-46.5-72-77.5-63.9-46.4 49.9-34.6 93.4c11.8 43.4 46.5 72 77.5 63.9zm281.4-29.3c-29.1-7-61.2 15.5-71.6 50.1-10.4 34.7 4.8 68.4 33.9 75.3 29.1 7 61.2-15.5 71.6-50.1 10.4-34.7-4.8-68.4-33.9-75.3zm-156.3 29.3c30.9 8.1 65.6-20.5 77.5-63.9 11.8-43.4-3.6-85.2-34.6-93.4s-65.6 20.5-77.5 63.9c-11.8 43.4 3.6 85.2 34.6 93.4z"/></svg>
              {_pets.breed}
            </span>
            <span className="text-1000 flex-wrap font-medium mb-2">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M510.3 445.9l-73-292.1c-3.8-15.2-16.4-25.7-30.9-25.7h-60.3c3.6-10.1 5.9-20.7 5.9-32 0-53-43-96-96-96s-96 43-96 96c0 11.3 2.3 22 5.9 32h-60.3c-14.4 0-27.1 10.5-30.9 25.7L1.7 445.9C-6.6 479.2 16.4 512 48 512h416c31.6 0 54.6-32.8 46.3-66.1zM256 128c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"/></svg>
              {_pets.weight}
            </span>
          </div>
        </div>
      );
    };


    return (
    <div className="flex justify-content-center">
        <Toast ref={toast} />
        <ConfirmDialog />
        <div className="flex flex-column justify-center py-4">
            <span className="block text-5xl font-bold text-black text-center">OUR ADOPTABLES</span>
            <div className="absolute top-0 right-0">
                <i className="pi pi-shopping-bag text-white text-right mr-4 mt-4" style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => {setView(true)}}></i>
            </div>
            
            <div className="pt-2">
                <span className="block text-2xl text-black text-center">These adorable rescues are looking for a new home and a family! Are you ready to give them love and belly rubs everyday?</span>
            </div>
            <div className="pt-4 card w-screen">
                <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={3000} itemTemplate={productTemplate} />
            </div>
        </div>
        <Dialog
          header="Adoptables"
          visible={view}
          className="p-fluid"
          style={{ width: "50vw" }}
          onHide={() => {
            setView(false);
          }}
          footer={viewFooterDialog}
        >
          <div className="flex flex-column p-3 overflow-y-auto max-h-25rem">
            <DataView value={basketPets} itemTemplate={basketTemplate} />
          </div>
        </Dialog>
    </div>
    )
}