import React, {useCallback, useState, useEffect} from 'react';
import Layout from "@components/Layout";
import {useRouter} from "next/router";
import styles from '@styles/Form.module.css';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_URL} from "@/config";
import { EventType } from '@/types';
import slugify from 'slugify';

const AddPage = () => {
  const router = useRouter();
  const [values, setValues] = useState<Partial<EventType>>({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
    slug: '',
  });

  useEffect(() => {
    if(!values.name) return;
    setValues({...values, ['slug']: slugify(values.name, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })})
  }, [values.name])

  const handleSubmit = async (e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(el => el === '');
    if (hasEmptyFields) {
      toast.error("Please fill in all fields!")
      return
    }
    const res: Response = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: values})
    });
    if(!res.ok) {
      toast.error("Something went wrong!!!")
    } else {
      const evt = await res.json();
      await router.push(`/events/${evt.data.attributes.slug}`)
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setValues({...values, [fieldName]: value})
  }, [values])

  return (
    <Layout title="Add new event">
      <Link href='/events' className="back">Go Back</Link>
      <h2>AddPage</h2>
      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Date</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn"/>
      </form>
    </Layout>
  );
};

export default AddPage;