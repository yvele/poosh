import Promise from "bluebird";

async function processGroup(group, iteratee, concurrency) {
  let mapper = async ([file, options], index) => {

    // Release the reference ASAP to avoid unnecessary memory pressure
    group[index] = undefined;

    await iteratee(file, options);
  };

  await Promise.map(group, mapper, { concurrency });
}

/**
 * Process files. Concurrency respects priority grouping.
 *
 * @param tuples Array of [file,options] tuples.
 * @param iteratee An async iteratee function.
 * @param concurrency
 */
export default async function shiftTuples(tuples, iteratee, concurrency: number) {
  if (!tuples.length) {
    return;
  }

  let groupPriority = tuples[0][0].priority;
  let group = [];

  for (let tuple = tuples.shift(); tuple; tuple = tuples.shift()) {

    let priority = tuple[0].priority;
    if (priority !== groupPriority) {

      await processGroup(group, iteratee, concurrency);
      groupPriority = priority;
      group = [];
    }

    group.push(tuple);
  }

  // If there is more: Process the remaining group
  if (group.length) {
    await processGroup(group, iteratee, concurrency);
  }
}
