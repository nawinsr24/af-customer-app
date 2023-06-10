import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import CtrlFillLabelTxtField from '../../components/CtrlFillLabelTxtField';
import FillLabelTxtField from '../../components/FillLabelTxtField';
import PlaceAutofill from '../../components/PlaceAutofill';
import ScrollBox from '../../components/ScrollBox';
import { getDistance } from '../../services/serv_services';



function SamplePricCalc() {
  const isLarge = useMediaQuery("(min-width: 600px)");
  let txtFielProps = { fontSize: 14, height: 38, width: 200 };
  const [ans, setAns] = useState({
    base: null,
    baseCalc: null,
    extraLod: null,
    extraLodCalc: null,
    aMat: null,
    aMatCalc: null,
    aLod: null,
    aLodCalc: null,
    final: null,
    pacBase: null,
    pacBaseCalc: null
  })
  const [loc, setLoc] = useState({
    fromId: null,
    toId: null,
    dis: "0",
    loadFac: 1,
    matTypeFac: 1,
    ratePerKm: 10,
    fullLoad: 15
  })


  async function handlePicChange(value) {
    setLoc(prevSel => { return { ...prevSel, fromId: value?.placeId } })

    if (loc.toId) {
      await calDistance(value?.placeId, loc.toId)
    }
  }

  async function handleDelChange(value) {
    setLoc(prevSel => { return { ...prevSel, toId: value?.placeId } })

    if (loc.fromId) {
      await calDistance(loc.fromId, value?.placeId)
    }
  }

  async function calDistance(fromId, toId) {
    let res = await getDistance({ fromId, toId })
    setLoc(prevSel => { return { ...prevSel, dis: res?.distance } })
  }

  function handleTxtFieldChange(e) {
    const { name, value } = e.target;

    setLoc(prevSel => { return { ...prevSel, [name]: value } })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const i = Object.fromEntries(formData);

    if (parseFloat(loc.dis) === 0)
      return;

    try {
      let fl = parseFloat(loc.fullLoad);
      let w = parseFloat(i.weight);
      let lodfac = parseFloat(i.loadFac);
      let matFac = parseFloat(i.matTypeFac);

      let dis = ((loc.dis).split(",").join("")).split("km").join("")

      let basePric = parseFloat(i.ratePerKm) * parseFloat(dis);

      if (w >= fl) {
        let extraLod = w - fl;
        let extraPric = w > fl ? ((basePric / fl) * extraLod) : 0;

        setAns({
          base: basePric.toFixed(2),
          baseCalc: `(${parseFloat(i.ratePerKm)} * ${parseFloat(dis)})`,
          extraLod: extraPric.toFixed(2),
          extraLodCalc: extraPric !== 0 ? `((Base Price / ${fl}) * ${extraLod.toFixed(2)})` : null,
          aMat: ((basePric + extraPric) * matFac).toFixed(2),
          aMatCalc: `((Base Price + Extra Load Charge) * ${matFac})`,
          aLod: ((basePric + extraPric) * matFac * lodfac).toFixed(2),
          aLodCalc: `((Base Price + Extra Load Charge) * ${matFac} * ${lodfac})`,
          final: ((basePric + extraPric) * matFac * lodfac).toFixed(2),
          pacBase: null,
          pacBaseCalc: null
        })
      } else {
        let pacBasePric = (basePric / fl) * w

        setAns( {
          base: basePric.toFixed(2),
          baseCalc: `(${parseFloat(i.ratePerKm)} * ${parseFloat(dis)})`,
          pacBase: (pacBasePric).toFixed(2),
          pacBaseCalc: `((Base Price / ${fl}) * ${w.toFixed(2)})`,
          aMat: ((pacBasePric) * matFac).toFixed(2),
          aMatCalc: `((Package Base Price) * ${matFac})`,
          aLod: ((pacBasePric) * matFac * lodfac).toFixed(2),
          aLodCalc: `((Package Base Price ) * ${matFac} * ${lodfac})`,
          final: ((pacBasePric) * matFac * lodfac).toFixed(2),
          extraLod: null,
          extraLodCalc: null
        })
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (


    <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, backgroundColor: "rgba(0, 0, 0, 0.08)", height: "100vh", width: isLarge ? "100vw" : "70rem" }}>
      <ScrollBox height={"100%"} >
        <Stack gap={4} pt={5} pl={isLarge ? 10 : 3} width={"100%"}>
          <Typography fontSize={25} fontWeight={"bold"}>Sample Price Calculation</Typography>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <CtrlFillLabelTxtField name="loadFac" type="number" step={0.01} title={"Load Factor"} {...txtFielProps} value={loc.loadFac} onChange={handleTxtFieldChange} />
            <CtrlFillLabelTxtField name="matTypeFac" type="number" step={0.01} title={"Material Type Factor"} {...txtFielProps} value={loc.matTypeFac} onChange={handleTxtFieldChange} />
            <CtrlFillLabelTxtField name="ratePerKm" type="number" step={0.01} title={"Rate per km For Full Load"} {...txtFielProps} value={loc.ratePerKm} onChange={handleTxtFieldChange} />
            <CtrlFillLabelTxtField name="fullLoad" type="number" step={0.01} title={"Full Load (Ton)"} {...txtFielProps} value={loc.fullLoad} onChange={handleTxtFieldChange} />
          </Stack>
          <Stack direction={"row"} gap={2} >
            <PlaceAutofill name="picLocation" title={"Pickup Location"} onSelect={handlePicChange} {...txtFielProps} width={300} />
            <PlaceAutofill name="delLocation" title={"Delivery Location"} onSelect={handleDelChange} {...txtFielProps} width={300} />
            <Stack justifyItems={"center"} ml={2}>
              <Typography fontSize={14} fontWeight={600} mb={0}> Distance </Typography>
              <Typography fontSize={25} fontWeight={"bold"} >{loc.dis}</Typography>
            </Stack>
          </Stack>
          <Stack direction={isLarge ? "row" : "column"} gap={isLarge ? 20 : 5} alignItems={"start"}>
            <Stack gap={4}>
              <FillLabelTxtField name="weight" type="number" step={0.01} title={"Package Weight (Ton)"} {...txtFielProps} />
              <Button variant='contained' sx={{ width: 200 }} type='submit'>Calculate</Button>
            </Stack>
            <Stack sx={{
              bgcolor: "rgba(223, 218, 248, 0.4)", borderRadius: 2, minWidth: 600, minHeight: 285, px: 4, py: 2, border: 1, borderColor: 'rgba(94, 71, 221, 0.5)'
            }}>
              <Typography fontSize={20} fontWeight="bold" color={"primary.main"}>Final Calculation</Typography>
              <Stack gap={2} mt={2}>
                <Ans amt={ans.base} calc={ans.baseCalc} title={"Base Price"} />
                {ans.extraLod && <Ans amt={ans.extraLod} calc={ans.extraLodCalc} title={"Extra Load Charge"} />}
                {ans.pacBase && <Ans amt={ans.pacBase} calc={ans.pacBaseCalc} title={"Package Base Price"} />}
                <Ans amt={ans.aMat} calc={ans.aMatCalc} title={"After Material Type Charge"} />
                <Ans amt={ans.aLod} calc={ans.aLodCalc} title={"After Load Factor Charge"} />
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <Typography fontSize={16} fontWeight={500}>Final Amount -  </Typography>
                  <Typography fontSize={20} color={"primary"} fontWeight={"bold"}><span name="Rs">&#8377;</span>{ans.final} </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ScrollBox>
    </form>



  )
}



function Ans({ amt, calc, title }) {
  return <Stack direction={"row"} alignItems={"center"} gap={1}>
    <Typography fontSize={16} fontWeight={500}>{title} - <span name="Rs">&#8377;</span>{amt} </Typography>
    <Typography fontSize={13} >{calc} </Typography>
  </Stack>
}


// if (w > fl) {
//   let extraLod = (w - fl).toFixed(2)

//   setAns({
//     base: (perTonKmPric * fl).toFixed(2),
//     baseCalc: `(${parseFloat(i.ratePerKm)} * ${parseFloat(dis)} * ${fl})`,
//     extraLod: (perTonKmPric * extraLod).toFixed(2),
//     extraLodCalc: `((Base Price / ${fl}) * ${extraLod})`,
//     aMat: (perTonKmPric * w * matFac).toFixed(2),
//     aMatCalc: `((Base Price + Extra Load Charge) * ${matFac})`,
//     aLod: (perTonKmPric * w * matFac * lodfac).toFixed(2),
//     aLodCalc: `((Base Price + Extra Load Charge) * ${matFac} * ${lodfac})`,
//     final: (perTonKmPric * w * matFac * lodfac).toFixed(2),
//   })

// } else {
//   setAns({
//     base: perTonKmPric * w,
//     baseCalc: `(${parseFloat(i.ratePerKm)} * ${parseFloat(dis)} * ${w})`,
//     extraLod: 0,
//     extraLodCalc: null,
//     aMat: perTonKmPric * w * matFac,
//     aMatCalc: `((Base Price + Extra Load Charge) * ${matFac})`,
//     aLod: perTonKmPric * w * matFac * lodfac,
//     aLodCalc: `((Base Price + Extra Load Charge) * ${matFac} * ${lodfac})`,
//     final: perTonKmPric * w * matFac * lodfac
//   })
// }


export default SamplePricCalc;