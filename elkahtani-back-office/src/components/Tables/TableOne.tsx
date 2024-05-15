import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import {
  Button,
  Label,
  Modal,
  TextInput,
  Select,
  FileInput,
} from 'flowbite-react';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

const apiUrl = 'http://127.0.0.1:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/';

interface Car {
  id: number;
  name: string;
  price: number;
  model: string;
  mark: string;
  year: string;
  doors: string;
  air: string;
  transmission: string;
  fuel: string;
  image: string;
  updated_at: string;
  created_at: string;
}

interface DataRow {
  name: string;
  price: number;
  mark: string;
  image: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    selector: (row) => row.name,
  },
  {
    name: 'Price',
    selector: (row) => row.price,
  },
  {
    name: 'mark',
    selector: (row) => row.mark,
  },
  {
    name: 'Image',
    cell: (row) => (
      <img
        src={baseUrl + `images/` + row.image}
        alt={row.name}
        style={{ width: '60px', height: 'auto', borderRadius: '10px' }}
      />
    ),
  },
];
const TableOne = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    model: '',
    mark: '',
    year: '',
    doors: '',
    air: 'yes',
    transmission: '',
    fuel: '',
    image: null as File | null, // Explicitly typed as File or null
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [id]: files[0] });
    }
  };

    const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const value = formData[key as keyof typeof formData];
        if (value !== null) {
          // Check if value is not null
          if (value instanceof File) {
            data.append(key, value, value.name); // Use the third overload for files
          } else {
            data.append(key, value);
          }
        }
      }
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cars', data);
      console.log('Car data submitted successfully' , response);
      // Optionally, you can handle the success response here
    } catch (error) {
      console.error('Failed to submit car data:', error);
      // Optionally, you can handle the error here
    }
  };

  function onCloseModal() {
    setOpenModal(false);
  }
  useEffect(() => {
    axios
      .get(apiUrl + 'cars')
      .then((response) => {
        setCars(response.data.cars);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between p-6">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Cars
        </h4>
        <Button onClick={() => setOpenModal(true)}>New Car</Button>
      </div>

      <DataTable columns={columns} data={cars} pagination />
      <Modal
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 dark:text-black"
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header className=" bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 dark:text-black" />
        <Modal.Body className=" bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 dark:text-black">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 text-black dark:text-white">
                Add new Car
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value="Name"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="price"
                    value="Price"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="model"
                    value="Model"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="mark"
                    value="Mark"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="mark"
                  value={formData.mark}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="year"
                    value="Year"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="doors"
                    value="Doors"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="doors"
                  value={formData.doors}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="air"
                    value="Air"
                    className="text-black dark:text-white"
                  />
                </div>
                <Select id="air" onChange={handleChange} required>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="transmission"
                    value="Transmission"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="fuel"
                    value="Fuel"
                    className="text-black dark:text-white"
                  />
                </div>
                <TextInput
                  id="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="image"
                    value="Image"
                    className="text-black dark:text-white"
                  />
                </div>
                <FileInput id="image" onChange={handleFileChange} />
              </div>

              <div className="w-full">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TableOne;
