export default function (formNames) {
  const forms = formNames instanceof Array ? formNames : [formNames];
  for (let i = 0; i < forms.length; i += 1) {
    this[forms[i]] = this.$options.data()[forms[i]];
    // this.$refs[forms[i]].resetFields();
  }
}
