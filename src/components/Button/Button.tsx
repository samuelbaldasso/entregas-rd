import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/components/Button/button.module.css";
import Link from "next/link";

export default function Button() {
  const [form, setForm] = useState([]);

  const handleAPI = async () => {
    const res = await axios.get(`/api`);
    setForm(res.data);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div>
      {form.map((e: any) => (
        <Link key={e?.title} href="#">
          <button className={styles.button}>
            <h3>{e?.title}</h3>
            <h3>{e?.date}</h3>
          </button>
        </Link>
      ))}
    </div>
  );
}
