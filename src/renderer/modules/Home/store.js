const MODEL_NAME = "report";

var MAX_COUNT = 5000;

export default {
  dictCache: null,
  save(model) {
    return $db.save(MODEL_NAME, model).then((res) => {
      return Promise.resolve()
        .then(() => {
          if (!model._id) {
            //删除历史
            return this.list().then((list) => {
              if (list && list.length > MAX_COUNT) {
                return this.remove({
                  _id: {
                    $in: list
                      .filter((item, i) => i >= MAX_COUNT)
                      .map((item) => item._id),
                  },
                });
              }
            });
          }
        })
        .then(() => {
          return res;
        });
    });
  },
  list(keyword) {
    var query = query || {};
    if (!!keyword) {
      query.$where = function() {
        var self = this;
        if (self.gzrrq) {
          return self.gzrrq.indexOf(keyword) >= 0;
        }
        return false;
      };
    }
    return $db.find(MODEL_NAME, query, { createTime: -1 });
  },
  remove(model) {
    return $db.remove(MODEL_NAME, model);
  },
  setDict(model) {
    this.dictCache = null;
    model._id = "$dict_id";
    return $db.save("DICT", model);
  },
  getDict(type) {
    return (this.dictCache
      ? Promise.resolve(this.dictCache)
      : $db.find("DICT", { _id: "$dict_id" }).then((res) => res[0] || {})
    ).then((res) => {
      if (!type) {
        return res;
      } else {
        return res[type] || [];
      }
    });
  },
};
