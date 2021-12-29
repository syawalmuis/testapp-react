import { useEffect, useState } from "react";

function Dosens({ dosens }) {
  const [pdosens, setPdosens] = useState([]);
  const [paginations, setPaginations] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    printDosens(0, 10, dosens);
    defaultPage(dosens.length);
    // if (dosens.length > 0) {
    //   document.querySelector("body").style.overflowY = "auto";
    // }
  }, [dosens]);

  const printDosens = (start, end, x = []) => {
    const element = [];
    for (let index = start; index < end; index++) {
      element.push(x[index]);
    }
    setPdosens(element);
  };

  const pageHandler = (e, x) => {
    const indexOf = paginations.findIndex((page) => {
      return page.id === e.id;
    });
    const copyPage = [...paginations];
    for (let index = 0; index < copyPage.length; index++) {
      copyPage[index] = {
        ...copyPage[index],
        current: false,
        next: false,
        prev: false,
      };
    }
    copyPage[indexOf] = { ...copyPage[indexOf], current: true };

    if (indexOf + 1 === copyPage.length) {
      copyPage[indexOf] = { ...copyPage[indexOf], next: true };
      copyPage[indexOf - 1] = { ...copyPage[indexOf - 1], prev: true };
    } else {
      copyPage[indexOf + 1] = { ...copyPage[indexOf + 1], next: true };
    }

    if (indexOf - 1 < 0) {
      copyPage[indexOf + 1] = { ...copyPage[indexOf + 1], next: true };
      copyPage[indexOf] = { ...copyPage[indexOf], prev: true };
    } else {
      copyPage[indexOf - 1] = { ...copyPage[indexOf - 1], prev: true };
    }

    printDosens(e.start, e.end, x);
    setPaginations(copyPage);
  };

  const defaultPage = (e) => {
    if (e !== 0) {
      const dataset = Math.ceil(e / 10);
      let startValue = 0;
      let endValue = 10;
      const arr = [];
      for (let index = 0; index < dataset; index++) {
        if (index + 1 === dataset) {
          arr.push({
            id: index,
            start: startValue,
            end: startValue + (e % 10),
            current: false,
            next: false,
            prev: false,
          });
        } else {
          arr.push({
            id: index,
            start: startValue,
            end: endValue,
            current: index === 0 ? true : false,
            next: index === 1 ? true : false,
            prev: index === 0 ? true : false,
          });
          startValue += 10;
          endValue += 10;
        }
      }
      setPaginations(arr);
    }
  };

  const searchHandler = (e, event) => {
    if (!event) {
      setInputValue("");
      return alert("Silahkan pilih kategori pencarian");
    }
    setInputValue(e);
    const filter = dosens.filter((dosen) => {
      let dosenn = dosen[event].toLowerCase();
      return dosenn.includes(e.toLowerCase());
    });
    if (e) {
      defaultPage(filter.length);
      setSearch(filter);
      if (filter.length >= 10) {
        return printDosens(0, 10, filter);
      }
      setPdosens(filter);
    } else {
      defaultPage(dosens.length);
      printDosens(0, 10, dosens);
    }
  };
  return (
    <>
      <section id="list-dosens">
        <h1 className="my-3 display-5">List dosens</h1>
        <div className="row mb-2">
          <div className="col-6">
            <input
              className="form-control shadow"
              onChange={(e) => searchHandler(e.target.value, searchBy)}
              type="text"
              value={inputValue}
            />
          </div>
          <div className="col-3">
            <select
              className="form-select shadow"
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="">Search By</option>
              <option value="nama">Nama dosen andalangmu</option>
              <option value="fakultas">Fakultas</option>
            </select>
          </div>
        </div>
        <div
          className="card card-body shadow table-responsive"
          id="table-dosens"
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>nbm</th>
                <th>Nama</th>
                <th>Fakultas</th>
                <th>Jenis Kelamin</th>
                <th>No. telepon</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {pdosens[0] !== undefined ? (
                pdosens.map((dosen, index) => {
                  return (
                    <tr key={dosen.id}>
                      <td>{++index}</td>
                      <td>{dosen.nbm ? dosen.nbm : "####"}</td>
                      <td>{dosen.nama}</td>
                      <td>{dosen.fakultas}</td>
                      <td>{dosen.jenis_kelamin}</td>
                      <td>{dosen.no_telpon ? dosen.no_telpon : "#######"}</td>
                      <td>{dosen.alamat ? dosen.alamat : "#######"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>Loading data....</td>
                </tr>
              )}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {paginations
                .filter((pagePrev) => pagePrev.prev)
                .map((prev) => {
                  return (
                    <li
                      className="page-item"
                      key={prev.id}
                      style={
                        prev.current
                          ? { cursor: "default" }
                          : { cursor: "pointer" }
                      }
                    >
                      <a
                        className="page-link"
                        href="#table-dosens"
                        onClick={() =>
                          pageHandler(prev, search.length > 0 ? search : dosens)
                        }
                      >
                        Prev
                      </a>
                    </li>
                  );
                })}
              {paginations.map((page) => {
                return (
                  <li
                    className={page.current ? "page-item active" : "page-item"}
                    key={page.id}
                    style={
                      page.current
                        ? { cursor: "default" }
                        : { cursor: "pointer" }
                    }
                  >
                    <a
                      className="page-link"
                      href="#table-dosens"
                      onClick={() =>
                        pageHandler(page, search.length > 0 ? search : dosens)
                      }
                    >
                      {page.id + 1}
                    </a>
                  </li>
                );
              })}

              {paginations
                .filter((pageNext) => pageNext.next)
                .map((next) => {
                  return (
                    <li
                      className="page-item"
                      key={next.id}
                      style={
                        next.current
                          ? { cursor: "default" }
                          : { cursor: "pointer" }
                      }
                    >
                      <a
                        className="page-link"
                        href="#table-dosens"
                        onClick={() =>
                          pageHandler(next, search.length > 0 ? search : dosens)
                        }
                      >
                        Next
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Dosens;
